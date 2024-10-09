import {
  BuildingLibraryIcon,
  EnvelopeOpenIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  LinkIcon,
  ShieldCheckIcon,
  UserIcon,
  WindowIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import {
  AddBox,
  AddBoxOutlined,
  BarChart,
  BarChartOutlined,
  BarChartRounded,
  Book,
  Build,
  BusAlert,
  Download,
  Key,
  People,
  Storage,
  SwapHoriz,
  Tablet,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Dashboard",
    path: "/",
    icon: (
      <SvgIcon>
        <HomeIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Identity Management",
    type: "header",
    items: [
      {
        title: "Administration",
        path: "/identity/administration",
        icon: (
          <SvgIcon>
            <WrenchIcon />
          </SvgIcon>
        ),
        items: [
          { title: "Users", path: "/identity/administration/users" },
          { title: "Risky Users", path: "/identity/administration/risky-users" },
          { title: "Groups", path: "/identity/administration/groups" },
          { title: "Devices", path: "/identity/administration/devices" },
          {
            title: "Deploy Group Template",
            path: "/identity/administration/deploy-group-template",
          },
          {
            title: "Group Templates",
            path: "/identity/administration/group-templates",
          },
          { title: "Deleted Items", path: "/identity/administration/deleted-items" },
          { title: "Roles", path: "/identity/administration/roles" },
          { title: "JIT Admin", path: "/identity/administration/jit-admin" },
          {
            title: "Offboarding Wizard",
            path: "/identity/administration/offboarding-wizard",
          },
        ],
      },
      {
        title: "Reports",
        path: "/identity/reports",
        icon: (
          <SvgIcon>
            <BarChart />
          </SvgIcon>
        ),
        items: [
          { title: "MFA Report", path: "/identity/reports/mfa-report" },
          { title: "Inactive Users", path: "/identity/reports/inactive-users-report" },
          { title: "Sign-in Report", path: "/identity/reports/signin-report" },
          {
            title: "AAD Connect Report",
            path: "/identity/reports/azure-ad-connect-report",
          },
          { title: "Risk Detections", path: "/identity/reports/risk-detections" },
        ],
      },
    ],
  },
  {
    title: "Tenant Administration",
    type: "header",
    items: [
      {
        title: "Administration",
        path: "/tenant/administration",
        icon: (
          <SvgIcon>
            <BuildingLibraryIcon />
          </SvgIcon>
        ),
        items: [
          { title: "Tenants", path: "/tenant/administration/tenants" },
          {
            title: "Alert Configuration",
            path: "/tenant/administration/alert-configuration",
          },
          { title: "Audit Logs", path: "/tenant/administration/audit-logs" },
          {
            title: "Enterprise Applications",
            path: "/tenant/administration/enterprise-apps",
          },
          { title: "Secure Score", path: "/tenant/administration/securescore" },
          {
            title: "App Consent Requests",
            path: "/tenant/administration/app-consent-requests",
          },
          {
            title: "Authentication Methods",
            path: "/tenant/administration/authentication-methods",
          },
          {
            title: "Tenant Onboarding",
            path: "/tenant/administration/tenant-onboarding",
          },
          {
            title: "Tenant Offboarding",
            path: "/tenant/administration/tenant-offboarding-wizard",
          },
          {
            title: "Partner Relationships",
            path: "/tenant/administration/partner-relationships",
          },
        ],
      },
      {
        title: "Configuration Backup",
        path: "/cipp/gdap",
        icon: (
          <SvgIcon>
            <Download />
          </SvgIcon>
        ),
        items: [
          { title: "Backup Wizard", path: "/tenant/backup/backup-wizard" },
          { title: "Restore Wizard", path: "/tenant/backup/restore-wizard" },
        ],
      },
      {
        title: "Tools",
        path: "/tenant/administration",
        icon: (
          <SvgIcon>
            <AddBoxOutlined />
          </SvgIcon>
        ),
        items: [
          {
            title: "Graph Explorer",
            path: "/tenant/administration/graph-explorer",
          },
          {
            title: "Application Approval",
            path: "/tenant/administration/appapproval",
          },
          { title: "IP Database", path: "/tenant/tools/geoiplookup" },
          { title: "Tenant Lookup", path: "/tenant/administration/tenantlookup" },
          {
            title: "Individual Domain Check",
            path: "/tenant/standards/individual-domains",
          },
          {
            title: "BPA Report Builder",
            path: "/tenant/tools/bpa-report-builder",
          },
        ],
      },
      {
        title: "Standards",
        path: "/tenant/standards",
        icon: (
          <SvgIcon>
            <Book />
          </SvgIcon>
        ),
        items: [
          {
            title: "Edit Standards",
            path: "/tenant/standards/list-applied-standards",
          },
          { title: "List Standards", path: "/tenant/standards/list-standards" },
          {
            title: "Best Practice Analyser",
            path: "/tenant/standards/bpa-report",
          },
          {
            title: "Domains Analyser",
            path: "/tenant/standards/domains-analyser",
          },
        ],
      },
      {
        title: "Conditional Access",
        path: "/tenant/administration",
        icon: (
          <SvgIcon>
            <Key />
          </SvgIcon>
        ),
        items: [
          { title: "CA Policies", path: "/tenant/conditional/list-policies" },
          {
            title: "Deploy CA Policies",
            path: "/tenant/conditional/deploy",
          },
          {
            title: "CA Policy Tester",
            path: "/tenant/conditional/test-policy",
          },
          {
            title: "CA Vacation Mode",
            path: "/tenant/conditional/deploy-vacation",
          },
          {
            title: "CA Templates",
            path: "/tenant/conditional/list-template",
          },
          {
            title: "Named Locations",
            path: "/tenant/conditional/list-named-locations",
          },
          {
            title: "Deploy Named Locations",
            path: "/tenant/conditional/deploy-named-location",
          },
        ],
      },
      {
        title: "GDAP Management",
        path: "/cipp/gdap",
        icon: (
          <SvgIcon>
            <UserIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: "Invite Wizard",
            path: "/tenant/administration/gdap-invite-wizard",
          },
          { title: "Invite List", path: "/tenant/administration/gdap-invites" },
          {
            title: "GDAP Relationships",
            path: "/tenant/administration/gdap-relationships",
          },
          {
            title: "Role Wizard",
            path: "/tenant/administration/gdap-role-wizard",
          },
          { title: "GDAP Roles", path: "/tenant/administration/gdap-roles" },
        ],
      },
      {
        title: "Reports",
        path: "/tenant/reports",
        icon: (
          <SvgIcon>
            <BarChartOutlined />
          </SvgIcon>
        ),
        items: [
          {
            title: "Licence Report",
            path: "/tenant/administration/list-licenses",
          },
          {
            title: "Consented Applications",
            path: "/tenant/administration/application-consent",
          },
          {
            title: "Service Health",
            path: "/tenant/administration/service-health",
          },
        ],
      },
    ],
  },
  {
    title: "Security & Compliance",
    type: "header",
    items: [
      {
        title: "Incidents & Alerts",
        path: "/security/incidents",
        icon: (
          <SvgIcon>
            <ExclamationTriangleIcon />
          </SvgIcon>
        ),
        items: [
          { title: "Incidents", path: "/security/incidents/list-incidents" },
          { title: "Alerts", path: "/security/incidents/list-alerts" },
        ],
      },
      {
        title: "Defender",
        path: "/security/defender",
        icon: (
          <SvgIcon>
            <ShieldCheckIcon />
          </SvgIcon>
        ),
        items: [
          { title: "Defender Status", path: "/security/defender/list-defender" },
          {
            title: "Defender Deployment",
            path: "/security/defender/deployment",
          },
          {
            title: "Vulnerabilities",
            path: "/security/defender/list-defender-tvm",
          },
        ],
      },
      {
        title: "Reports",
        path: "/security/reports",
        icon: (
          <SvgIcon>
            <BarChartOutlined />
          </SvgIcon>
        ),
        items: [
          {
            title: "Device Compliance",
            path: "/security/reports/list-device-compliance",
          },
        ],
      },
    ],
  },
  {
    title: "Intune",
    type: "header",
    items: [
      {
        title: "Applications",
        path: "/endpoint/applications",
        icon: (
          <SvgIcon>
            <WindowIcon />
          </SvgIcon>
        ),
        items: [
          { title: "Applications", path: "/endpoint/applications/list" },
          { title: "Application Queue", path: "/endpoint/applications/queue" },
          { title: "Add Choco App", path: "/endpoint/applications/add-choco-app" },
          { title: "Add Store App", path: "/endpoint/applications/add-winget-app" },
          { title: "Add Office App", path: "/endpoint/applications/add-office-app" },
          { title: "Add MSP App", path: "/endpoint/applications/add-rmm-app" },
        ],
      },
      {
        title: "Autopilot",
        path: "/endpoint/autopilot",
        icon: (
          <SvgIcon>
            <Tablet />
          </SvgIcon>
        ),
        items: [
          { title: "Autopilot Devices", path: "/endpoint/autopilot/list-devices" },
          { title: "Add Autopilot Device", path: "/endpoint/autopilot/add-device" },
          { title: "Profiles", path: "/endpoint/autopilot/list-profiles" },
          { title: "Add Profile", path: "/endpoint/autopilot/add-profile" },
          { title: "Status Pages", path: "/endpoint/autopilot/list-status-pages" },
          { title: "Add Status Page", path: "/endpoint/autopilot/add-status-page" },
        ],
      },
      {
        title: "Device Management",
        path: "/endpoint/MEM",
        icon: (
          <SvgIcon>
            <SwapHoriz />
          </SvgIcon>
        ),
        items: [
          { title: "Devices", path: "/endpoint/reports/devices" },
          { title: "Configuration Policies", path: "/endpoint/MEM/list-policies" },
          { title: "Compliance Policies", path: "/endpoint/MEM/list-compliance-policies" },
          { title: "Protection Policies", path: "/endpoint/MEM/list-appprotection-policies" },
          { title: "Apply Policy", path: "/endpoint/MEM/add-policy" },
          { title: "Policy Templates", path: "/endpoint/MEM/list-templates" },
          { title: "Add Policy Template", path: "/endpoint/MEM/add-policy-template" },
        ],
      },
      {
        title: "Reports",
        path: "/endpoint/reports",
        icon: (
          <SvgIcon>
            <BarChartRounded />
          </SvgIcon>
        ),
        items: [
          { title: "Analytics Device Score", path: "/endpoint/reports/analyticsdevicescore" },
        ],
      }
    ],
  },
  {
    title: "Teams & Sharepoint",
    type: "header",
    items: [
      {
        title: "OneDrive",
        path: "/teams-share/onedrive",
        icon: (
          <SvgIcon>
            <Storage />
          </SvgIcon>
        ),
        items: [{ title: "OneDrive", path: "/teams-share/onedrive/list" }],
      },
      {
        title: "SharePoint",
        path: "/teams-share/sharepoint",
        icon: (
          <SvgIcon>
            <LinkIcon />
          </SvgIcon>
        ),
        items: [{ title: "SharePoint", path: "/teams-share/sharepoint/list-sharepoint" }],
      },
      {
        title: "Teams",
        path: "/teams-share/teams",
        icon: (
          <SvgIcon>
            <People />
          </SvgIcon>
        ),
        items: [
          { title: "Teams", path: "/teams-share/teams/list-team" },
          { title: "Add Team", path: "/teams-share/teams/add-team" },
          { title: "Teams Activity", path: "/teams-share/teams/teams-activity" },
          { title: "Business Voice", path: "/teams-share/teams/business-voice" },
        ],
      },
    ],
  },
  {
    title: "Email & Exchange",
    type: "header",
    items: [
      {
        title: "Administration",
        path: "/email/Administration",
        icon: (
          <SvgIcon>
            <Build />
          </SvgIcon>
        ),
        items: [
          { title: "Mailboxes", path: "/email/administration/mailboxes" },
          { title: "Deleted Mailboxes", path: "/email/administration/deleted-mailboxes" },
          { title: "Mailbox Rules", path: "/email/administration/mailbox-rules" },
          { title: "Contacts", path: "/email/administration/contacts" },
          { title: "Quarantine", path: "/email/administration/quarantine" },
          {
            title: "Tenant Allow/Block Lists",
            path: "/email/administration/tenant-allow-block-lists",
          },
        ],
      },
      {
        title: "Tools",
        path: "/email/tools",
        icon: (
          <SvgIcon>
            <AddBox />
          </SvgIcon>
        ),
        items: [
          {
            title: "Mailbox Restore Wizard",
            path: "/email/tools/mailbox-restore-wizard",
          },
          { title: "Mailbox Restores", path: "/email/tools/mailbox-restores" },
          { title: "Mail Test", path: "/email/tools/mail-test" },
          { title: "Message Viewer", path: "/email/tools/message-viewer" },
        ],
      },
      {
        title: "Transport",
        path: "/email/Transport",
        icon: (
          <SvgIcon>
            <BusAlert />
          </SvgIcon>
        ),
        items: [
          { title: "Transport rules", path: "/email/transport/list-rules" },
          {
            title: "Deploy Transport rule",
            path: "/email/transport/deploy-rules",
          },
          {
            title: "Transport Templates",
            path: "/email/transport/list-templates",
          },
          { title: "Connectors", path: "/email/connectors/list-connectors" },
          {
            title: "Deploy Connector Templates",
            path: "/email/connectors/deploy-connector",
          },
          {
            title: "Connector Templates",
            path: "/email/connectors/list-connector-templates",
          },
        ],
      },
      {
        title: "Spamfilter",
        path: "/email/spamfilter",
        icon: (
          <SvgIcon>
            <EnvelopeOpenIcon />
          </SvgIcon>
        ),
        items: [
          { title: "Spamfilter", path: "/email/spamfilter/list-spamfilter" },
          {
            title: "Apply Spamfilter Template",
            path: "/email/spamfilter/deploy",
          },
          { title: "Templates", path: "/email/spamfilter/list-templates" },
        ],
      },
      {
        title: "Resource Management",
        path: "/resources/management",
        icon: (
          <SvgIcon>
            <BusAlert />
          </SvgIcon>
        ),
        items: [
          { title: "Rooms", path: "/resources/management/list-rooms" },
          { title: "Room Lists", path: "/resources/management/room-lists" },
        ],
      },
      {
        title: "Reports",
        path: "/email/reports",
        icon: (
          <SvgIcon>
            <BarChartRounded />
          </SvgIcon>
        ),
        items: [
          {
            title: "Mailbox Statistics",
            path: "/email/reports/mailbox-statistics",
          },
          {
            title: "Mailbox Client Access Settings",
            path: "/email/reports/mailbox-cas-settings",
          },
          { title: "Message Trace", path: "/email/reports/message-trace" },
          {
            title: "Anti-Phishing Filters",
            path: "/email/reports/antiphishing-filters",
          },
          { title: "Malware Filters", path: "/email/reports/malware-filters" },
          {
            title: "Safe Links Filters",
            path: "/email/reports/safelinks-filters",
          },
          {
            title: "Safe Attachments Filters",
            path: "/email/reports/safeattachments-filters",
          },
          {
            title: "Shared Mailbox with Enabled Account",
            path: "/email/reports/SharedMailboxEnabledAccount",
          },
        ],
      },
    ],
  },
  {
    title: "CIPP",
    type: "header",
    items: [
      {
        title: "Settings",
        icon: (
          <SvgIcon>
            <WrenchIcon />
          </SvgIcon>
        ),
        items: [
          { title: "Application Settings", path: "/cipp/settings" },
          { title: "Extensions Settings", path: "/cipp/extensions" },
          { title: "Extension Sync", path: "/cipp/extension-sync" },
          { title: "User Settings", path: "/cipp/user-settings" },
          { title: "Scheduler", path: "/cipp/scheduler" },
          { title: "Logbook", path: "/cipp/logs" },
          { title: "Statistics", path: "/cipp/statistics" },
          { title: "SAM Setup Wizard", path: "/onboarding" },
          { title: "Log Out", path: "/logout" },
        ],
      },
    ],
  },
];
