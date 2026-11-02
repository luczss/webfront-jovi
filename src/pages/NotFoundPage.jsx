import { Link } from "react-router-dom";

import Button from "../components/ui/Button";
import StateMessage from "../components/ui/StateMessage";

export default function NotFoundPage() {
  return (
    <div className="wrap py-20">
      <StateMessage
        title="Página não encontrada"
        action={
          <Button as={Link} to="/">
            Voltar ao início
          </Button>
        }
      >
        O endereço acessado não existe no SnapFlow.
      </StateMessage>
    </div>
  );
}