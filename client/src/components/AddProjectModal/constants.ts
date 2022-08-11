const initialState = { name: "", description: "", status: "new" };

const textFieldProps = [
  { label: "Name", name: "name" },
  { label: "Description", name: "description" },
  // { label: "ClientId", name: "clientId" },
  { label: "Status", name: "status" }
];

const statusItems = [
  { value: "new", statusItem: "Not Started" },
  { value: "progress", statusItem: "In Progress" },
  { value: "completed", statusItem: "Completed" }
];

export { initialState, statusItems, textFieldProps };
