import React, { useCallback, useEffect, useState } from 'react'
import { CButton, CCallout, CCol, CForm, CRow, CSpinner, CTooltip } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, FormSpy } from 'react-final-form'
import {
  RFFCFormInput,
  RFFCFormInputArray,
  RFFCFormInputList,
  RFFCFormSwitch,
  RFFSelectSearch,
} from 'src/components/forms'
import {
  useGenericGetRequestQuery,
  useLazyGenericGetRequestQuery,
  useLazyGenericPostRequestQuery,
} from 'src/store/api/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippContentCard, CippPage, CippPageList } from 'src/components/layout'
import { cellBadgeFormatter, cellDateFormatter } from 'src/components/tables'
import { CellTip, cellGenericFormatter } from 'src/components/tables/CellGenericFormat'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ModalService, TenantSelector } from 'src/components/utilities'
import CippCodeOffCanvas from 'src/components/utilities/CippCodeOffcanvas'
import arrayMutators from 'final-form-arrays'
import { useListTenantsQuery } from 'src/store/api/tenants'
import { setCurrentTenant } from 'src/store/features/app'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { queryString } from 'src/helpers'

const Scheduler = () => {
  const [initialValues, setInitialValues] = useState({})
  const [selectedTenant, setSelectedTenant] = useState('')
  const [ExecuteGetRequest, getResults] = useLazyGenericGetRequestQuery()
  const { data: tenants, isSuccess: tenantSuccess } = useListTenantsQuery({
    showAllTenantSelector: true,
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const updateSearchParams = useCallback(
    (params) => {
      navigate(`${queryString(params)}`, { replace: true })
    },
    [navigate],
  )

  const recurrenceOptions = [
    { value: '0', name: 'Only once' },
    { value: '1', name: 'Every 1 day' },
    { value: '7', name: 'Every 7 days' },
    { value: '30', name: 'Every 30 days' },
    { value: '365', name: 'Every 365 days' },
  ]

  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const [ocVisible, setOCVisible] = useState(false)

    const handleDeleteSchedule = (apiurl, message) => {
      ModalService.confirm({
        title: 'Confirm',
        body: <div>{message}</div>,
        onConfirm: () =>
          ExecuteGetRequest({ path: apiurl }).then((res) => {
            setRefreshState(res.requestId)
          }),
        confirmLabel: 'Continue',
        cancelLabel: 'Cancel',
      })
    }
    let jsonResults
    try {
      jsonResults = JSON.parse(row.Results)
    } catch (error) {
      jsonResults = row.Results
    }

    return (
      <>
        <CTooltip content="View Results">
          <CButton size="sm" color="success" variant="ghost" onClick={() => setOCVisible(true)}>
            <FontAwesomeIcon icon={'eye'} href="" />
          </CButton>
        </CTooltip>
        <CTooltip content="Copy Task">
          <CButton size="sm" color="warning" variant="ghost" onClick={() => onCopy(row)}>
            <FontAwesomeIcon icon="copy" href="" />
          </CButton>
        </CTooltip>
        <CTooltip content="Delete task">
          <CButton
            onClick={() =>
              handleDeleteSchedule(
                `/api/RemoveScheduledItem?&ID=${row.RowKey}`,
                'Do you want to delete this job?',
              )
            }
            size="sm"
            variant="ghost"
            color="danger"
          >
            <FontAwesomeIcon icon={'trash'} href="" />
          </CButton>
        </CTooltip>
        <CippCodeOffCanvas
          hideButton
          title="Results"
          row={jsonResults}
          state={ocVisible}
          type="TemplateResults"
          hideFunction={() => setOCVisible(false)}
        />
      </>
    )
  }

  const currentDate = new Date()
  const [startDate, setStartDate] = useState(currentDate)
  const tenantDomain = useSelector((state) => state.app.currentTenant.defaultDomainName)
  const [refreshState, setRefreshState] = useState(false)
  const taskName = `Scheduled Task ${currentDate.toLocaleString()}`
  const { data: availableCommands = [], isLoading: isLoadingcmd } = useGenericGetRequestQuery({
    path: 'api/ListFunctionParameters?Module=CIPPCore',
  })
  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const onSubmit = (values) => {
    const unixTime = Math.floor(startDate.getTime() / 1000)
    const shippedValues = {
      TenantFilter: tenantDomain,
      Name: values.taskName,
      Command: values.command,
      Parameters: values.parameters,
      ScheduledTime: unixTime,
      Recurrence: values.Recurrence,
      AdditionalProperties: values.additional,
      PostExecution: {
        Webhook: values.webhook,
        Email: values.email,
        PSA: values.psa,
      },
    }
    genericPostRequest({ path: '/api/AddScheduledItem', values: shippedValues }).then((res) => {
      setRefreshState(res.requestId)
    })
  }

  const onCopy = (row) => {
    // Get post execution options
    var postExecActions = row.PostExecution.split(',')
    // Get recurrence object
    var recurrence = recurrenceOptions.filter((rec) => rec.value === row.Recurrence)[0]

    // Convert parameters into form object
    var parameters = {}
    Object.keys(row?.Parameters).forEach((key) => {
      if (typeof row?.Parameters[key] === 'object') {
        var nestedParamList = []
        Object.keys(row?.Parameters[key]).forEach((nestedKey) => {
          if (nestedKey >= 0) {
            nestedParamList.push(row?.Parameters[key][nestedKey])
          } else {
            nestedParamList.push({
              Key: nestedKey,
              Value: row?.Parameters[key][nestedKey],
            })
          }
        })
        parameters[key] = nestedParamList
      } else {
        parameters[key] = row?.Parameters[key]
      }
    })

    // Convert additional properties into form object
    var additional = []
    var additionalProps = JSON.parse(row?.AdditionalProperties)
    Object.keys(additionalProps).forEach((key) => {
      console.log(key)
      additional.push({
        Key: key,
        Value: additionalProps[key],
      })
    })

    if (!recurrence) {
      recurrence = { name: 'Only once', value: '0' }
    }

    // Set initial values
    var formValues = {
      taskName: row.Name,
      command: { label: row.Command, value: row.Command },
      Recurrence: { label: recurrence.name, value: recurrence.value },
      additional: additional,
      parameters: parameters,
      webhook: postExecActions.includes('Webhook'),
      email: postExecActions.includes('Email'),
      psa: postExecActions.includes('PSA'),
    }
    setInitialValues(formValues)
    setSelectedTenant(row.Tenant)
  }

  // Update tenant selector on copy
  useEffect(() => {
    if (selectedTenant !== '' && tenantSuccess) {
      const customerId = searchParams.get('customerId')
      const tableFilter = searchParams.get('tableFilter')
      var newSearchParams = {}
      if (tableFilter) {
        newSearchParams.tableFilter = tableFilter
      }
      const tenant = tenants.filter((t) => t.defaultDomainName === selectedTenant)
      if (tenant.length > 0) {
        dispatch(setCurrentTenant({ tenant: tenant[0] }))
        newSearchParams.customerId = tenant[0]?.customerId
        updateSearchParams(newSearchParams)
        setSelectedTenant('')
      }
    }
  }, [selectedTenant, tenantSuccess, tenants, dispatch, searchParams, updateSearchParams])

  const columns = [
    {
      name: 'Name',
      selector: (row) => row['Name'],
      sortable: true,
      cell: (row) => CellTip(row['Name']),
      exportSelector: 'Name',
    },
    {
      name: 'Tenant',
      selector: (row) => row['Tenant'],
      sortable: true,
      cell: (row) => CellTip(row['Tenant']),
      exportSelector: 'Tenant',
    },
    {
      name: 'Task State',
      selector: (row) => row['TaskState'],
      sortable: true,
      cell: cellBadgeFormatter(),
      exportSelector: 'TaskState',
    },
    {
      name: 'Command',
      selector: (row) => row['Command'],
      sortable: true,
      cell: (row) => CellTip(row['Command']),
      exportSelector: 'Command',
    },
    {
      name: 'Parameters',
      selector: (row) => row['Parameters'],
      sortable: true,
      cell: cellGenericFormatter(),
      exportSelector: 'Parameters',
    },
    {
      name: 'Scheduled Time',
      selector: (row) => row['ScheduledTime'],
      sortable: true,
      cell: cellDateFormatter({ format: 'relative' }),
      exportSelector: 'ScheduledTime',
    },
    {
      name: 'Last executed time',
      selector: (row) => row['ExecutedTime'],
      sortable: true,
      cell: cellDateFormatter({ format: 'relative' }),
      exportSelector: 'ExecutedTime',
    },
    {
      name: 'Recurrence',
      selector: (row) => row['Recurrence'],
      sortable: true,
      cell: (row) => CellTip(row['Recurrence']),
      exportSelector: 'Recurrence',
    },
    {
      name: 'Sending to',
      selector: (row) => row['PostExecution'],
      sortable: true,
      cell: (row) => CellTip(row['PostExecution']),
      exportSelector: 'PostExecution',
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '100px',
    },
  ]
  return (
    <CippPage title={`Add Schedule`} tenantSelector={false}>
      <>
        <CRow>
          <CCol md={4}>
            <CippContentCard title="Add Task" icon={faEdit}>
              <Form
                onSubmit={onSubmit}
                mutators={{
                  ...arrayMutators,
                }}
                initialValues={{ ...initialValues }}
                render={({ handleSubmit, submitting, values }) => {
                  return (
                    <CForm onSubmit={handleSubmit}>
                      <CRow className="mb-3">
                        <CCol>
                          <label>Tenant</label>
                          <Field name="tenantFilter">{(props) => <TenantSelector />}</Field>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <RFFCFormInput
                            type="text"
                            name="taskName"
                            label="Task Name"
                            firstValue={`Task ${currentDate.toLocaleString()}`}
                          />
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <label>Scheduled Date</label>
                          <DatePicker
                            className="form-control mb-3"
                            selected={startDate}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="Pp"
                            onChange={(date) => setStartDate(date)}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol>
                          <RFFSelectSearch
                            values={recurrenceOptions}
                            name="Recurrence"
                            placeholder="Select a recurrence"
                            label="Recurrence"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol>
                          <RFFSelectSearch
                            values={availableCommands.map((cmd) => ({
                              value: cmd.Function,
                              name: cmd.Function,
                            }))}
                            name="command"
                            placeholder={
                              isLoadingcmd ? (
                                <CSpinner size="sm" />
                              ) : (
                                'Select a command or report to execute.'
                              )
                            }
                            label="Command to execute"
                          />
                        </CCol>
                      </CRow>
                      <FormSpy>
                        {/* eslint-disable react/prop-types */}
                        {(props) => {
                          const selectedCommand = availableCommands.find(
                            (cmd) => cmd.Function === props.values.command?.value,
                          )
                          return (
                            <CRow className="mb-3">
                              <CCol>{selectedCommand?.Synopsis}</CCol>
                            </CRow>
                          )
                        }}
                      </FormSpy>
                      <CRow>
                        <FormSpy>
                          {/* eslint-disable react/prop-types */}
                          {(props) => {
                            const selectedCommand = availableCommands.find(
                              (cmd) => cmd.Function === props.values.command?.value,
                            )
                            let paramblock = null
                            if (selectedCommand) {
                              //if the command parameter type is boolean we use <RFFCFormCheck /> else <RFFCFormInput />.
                              const parameters = selectedCommand.Parameters
                              if (parameters.length > 0) {
                                paramblock = parameters.map((param, idx) => (
                                  <CRow key={idx} className="mb-3">
                                    <CTooltip
                                      content={
                                        param?.Description !== null
                                          ? param.Description
                                          : 'No Description'
                                      }
                                      placement="left"
                                    >
                                      <CCol>
                                        {param.Type === 'System.Boolean' ||
                                        param.Type ===
                                          'System.Management.Automation.SwitchParameter' ? (
                                          <>
                                            <label>{param.Name}</label>
                                            <RFFCFormSwitch
                                              initialValue={false}
                                              name={`parameters.${param.Name}`}
                                              label={`True`}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            {param.Type === 'System.Collections.Hashtable' ? (
                                              <RFFCFormInputArray
                                                name={`parameters.${param.Name}`}
                                                label={`${param.Name}`}
                                                key={idx}
                                              />
                                            ) : (
                                              <>
                                                {param.Type === 'System.String[]' ? (
                                                  <RFFCFormInputList
                                                    name={`parameters.${param.Name}[]`}
                                                    label={`${param.Name}`}
                                                    key={idx}
                                                  />
                                                ) : (
                                                  <RFFCFormInput
                                                    type="text"
                                                    key={idx}
                                                    name={`parameters.${param.Name}`}
                                                    label={`${param.Name}`}
                                                  />
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                      </CCol>
                                    </CTooltip>
                                  </CRow>
                                ))
                              }
                            }
                            return paramblock
                          }}
                        </FormSpy>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol>
                          <RFFCFormInputArray name={`additional`} label="Additional Properties" />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol>
                          <label>Send results to</label>
                          <RFFCFormSwitch name="webhook" label="Webhook" />
                          <RFFCFormSwitch name="email" label="E-mail" />
                          <RFFCFormSwitch name="psa" label="PSA" />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol md={6}>
                          <CButton type="submit" disabled={submitting}>
                            Add Schedule
                            {postResults.isFetching && (
                              <FontAwesomeIcon
                                icon={faCircleNotch}
                                spin
                                className="ms-2"
                                size="1x"
                              />
                            )}
                          </CButton>
                        </CCol>
                      </CRow>
                      {postResults.isSuccess && (
                        <CCallout color="success">
                          <li>{postResults.data.Results}</li>
                        </CCallout>
                      )}
                      {getResults.isFetching && (
                        <CCallout color="info">
                          <CSpinner>Loading</CSpinner>
                        </CCallout>
                      )}
                      {getResults.isSuccess && (
                        <CCallout color="info">{getResults.data?.Results}</CCallout>
                      )}
                      {getResults.isError && (
                        <CCallout color="danger">
                          Could not connect to API: {getResults.error.message}
                        </CCallout>
                      )}
                    </CForm>
                  )
                }}
              />
            </CippContentCard>
          </CCol>
          <CCol md={8}>
            <CippPageList
              key={refreshState}
              capabilities={{
                allTenants: true,
                helpContext: 'https://google.com',
              }}
              title="Scheduled Tasks"
              tenantSelector={false}
              datatable={{
                tableProps: {
                  selectableRows: true,
                  actionsList: [
                    {
                      label: 'Delete task',
                      modal: true,
                      modalUrl: `/api/RemoveScheduledItem?&ID=!RowKey`,
                      modalMessage: 'Do you want to delete this job?',
                    },
                  ],
                },
                filterlist: [
                  {
                    filterName: 'Planned Jobs',
                    filter: 'Complex: TaskState eq Planned',
                  },
                  {
                    filterName: 'Completed Jobs',
                    filter: 'Complex: TaskState eq Completed',
                  },
                  {
                    filterName: 'Recurring Jobs',
                    filter: 'Complex: Recurrence gt 0',
                  },
                  {
                    filterName: 'One-time Jobs',
                    filter: 'Complex: Recurrence eq 0',
                  },
                ],
                keyField: 'id',
                columns,
                reportName: `Scheduled-Jobs`,
                path: `/api/ListScheduledItems?RefreshGuid=${refreshState}`,
              }}
            />
          </CCol>
        </CRow>
      </>
    </CippPage>
  )
}

export default Scheduler
