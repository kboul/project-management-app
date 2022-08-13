const textFields = [
  { label: "Name", name: "name" },
  { label: "Description", name: "description" },
  { label: "Client", name: "clientId" },
  { label: "Status", name: "status" }
];

const statusItems = [
  { value: "new", item: "Not Started" },
  { value: "progress", item: "In Progress" },
  { value: "completed", item: "Completed" }
];

export { statusItems, textFields };
