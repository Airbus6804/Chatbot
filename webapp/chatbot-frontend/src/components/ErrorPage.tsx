import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface Props {
  text: string;
}
export default function ErrorPage({ text }: Props) {
  return (
    <Alert variant={"destructive"}>
      <AlertTitle>C'è stato un errore!</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}
