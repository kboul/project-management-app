import Slide, { SlideProps } from "@mui/material/Slide";

type TransitionProps = Omit<SlideProps, "direction">;

export default function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}
