const sx_32 = "32";
const sx_15 = "15";
const fill = "1";
export const advanceIcon = () => {
  const advanceIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx_32}
      height={sx_32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-server"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  );
  return advanceIcon_;
};

export const inscriptionsIcon = () => {
  const inscriptionsIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx_32}
      height={sx_32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-trello"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <rect x="7" y="7" width="3" height="9"></rect>
      <rect x="14" y="7" width="3" height="5"></rect>
    </svg>
  );
  return inscriptionsIcon_;
};

export const ProjectIcon = () => {
  const projectIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx_32}
      height={sx_32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-briefcase"
    >
      <rect x={2} y={7} width={20} height={14} rx={2} ry={2} />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );

  return projectIcon_;
};

export const userIcon = () => {
  const userIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx_32}
      height={sx_32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-users"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx={9} cy={7} r={4} />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
  return userIcon_;
};

export const dashboardIcon = () => {
  const dashboardIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx_32}
      height={sx_32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-pie-chart"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
  return dashboardIcon_;
};

export const cirlceIcon = () => {
  const cirlceIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx_32}
      height={sx_32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-circle"
    >
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  );
  return cirlceIcon_;
};

export const plusIcon = () => {
  const plusIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx_15}
      height={sx_15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-plus-circle"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );
  return plusIcon_;
};

export const editIcon = () => {
  const editIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sx_15}
      height={sx_15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-edit"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
  return editIcon_;
};

export const arrowDownIcon = () => {
  const arrowDownIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-arrow-down"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  );
  return arrowDownIcon_;
};

export const searchIcon = (size, fill) => {
  const searchIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-search"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
  return searchIcon_;
};

export const circleIcon = (size, fill = "black") => {
  const circleIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-circle"
    >
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  );
  return circleIcon_;
};

export const slashIcon = (size = "15", fill = "none", stroke = "1") => {
  const slashIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-slash"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
    </svg>
  );
  return slashIcon_;
};

export const checkIcon = (size = "15", fill = "none", stroke = "1") => {
  const checkIcon_ = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-check-circle"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
  return checkIcon_;
};
