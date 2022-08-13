interface Form {
  name: string;
  email: string;
  phone: string;
}

interface AddClientDialogProps {
  onClose: () => void;
  open: boolean;
}

export type { Form, AddClientDialogProps };
