import styled from "styled-components";
import AppButton from "../../../shared/components/Buttons/AppButton";
import { toast } from "react-toastify";
import AppIcon from "../../../shared/components/AppIcon";
import { DeleteUserByIdService } from "../services/deleteUserById.service";
import { DeleteElementByIdService } from "../services/deleteElementById.service";
import { DeletePeopleByIdService } from "../services/deletePeopleById.service";

const deleteServices: Record<string, any> = {
  users: new DeleteUserByIdService(),
  products: new DeleteElementByIdService(),
  employees: new DeletePeopleByIdService(),
};

const entityNames: Record<string, string> = {
  users: "usuario",
  products: "elemento",
  employees: "funcionario",
};

interface ConfirmActionProps {
  dataDelete?: any;
  onClose: () => void;
  onSave: () => void;
  page: string;
}

const ConfirmAction: React.FC<ConfirmActionProps> = ({ onClose, dataDelete, onSave, page }) => {
  const handleDelete = async () => {
    const service = deleteServices[page];
    const entityName = entityNames[page];

    if (dataDelete?.id && service && entityName) {
      try {
        await service.run(dataDelete.id);
        toast.success(
          `¡Se ha eliminado el ${entityName} ${dataDelete.name || dataDelete.elementName} correctamente!`
        );
        onClose();
        onSave();
      } catch (error: any) {
        toast.error(`Error al eliminar el ${entityName}  ${dataDelete.name || dataDelete.elementName}: ${error.response.data.message}`);
      }
    }
  };

  return (
    <ConfirmActionStyle>
      <div className="confirm-action">
        <div className="action-body">
          <AppIcon icon="triangle-exclamation" />
          Estas a punto de eliminar el {entityNames[page]}
          <span className="fw-bold">
            {dataDelete?.name || dataDelete?.elementName || "desconocido"}
          </span>
        </div>
        <div className="action-footer">
          <AppButton outlined variant="dark" onClick={onClose}>
            Cancelar
          </AppButton>
          <AppButton variant="danger" onClick={handleDelete}>
            Confirmar
          </AppButton>
        </div>
      </div>
    </ConfirmActionStyle>
  );
};

export default ConfirmAction;


const ConfirmActionStyle = styled.div`
    .confirm-action {
        min-width: 350px;
        max-width: 400px;
    }
    .action-body {
        display: flex;
        align-items: center;
        gap: .5rem;
        padding: 1rem 0;
    }
    .action-body svg {
        color: var(--color-danger);
        font-size: 16px;
    }
    .action-footer {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        padding: 1rem 0;
    }
    @media (min-width: 768px) {
        .confirm-action {
            max-width: 450px;
            min-width: 350px;
        }
    }
`