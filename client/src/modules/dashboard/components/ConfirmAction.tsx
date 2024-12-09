import styled from "styled-components";
import AppButton from "../../../shared/components/Buttons/AppButton";

import { toast } from "react-toastify";
import AppIcon from "../../../shared/components/AppIcon";
import { DeleteUserByIdService } from "../services/deleteUserById.service";
import { DeleteElementByIdService } from "../services/deleteElementById.service";

interface ConfirmActionProps {
    dataDelete?: any;
    onClose: () => void;
    onSave: () => void;
    page: string;
}

const deleteUserService = new DeleteUserByIdService();
const deleteElementByIdService = new DeleteElementByIdService();

const ConfirmAction: React.FC<ConfirmActionProps> = ({ onClose, dataDelete, onSave, page }) => {
    console.log(dataDelete);
    const handleDelete = async() => {
        if (dataDelete.id) {
            if (page === 'users') {
                await deleteUserService.run(dataDelete.id);
                onClose();
                onSave();
                toast.success(`¡Se ha eliminado el usuario ${dataDelete.name} correctamente!`);
            } else {
                await deleteElementByIdService.run(dataDelete.id);
                onClose();
                onSave();
                toast.success(`¡Se ha eliminado el elemento ${dataDelete.elementName} correctamente!`);
            }
        }
    }
    return (
        <ConfirmActionStyle>
            <div className="confirm-action">
                <div className="action-body">
                    <AppIcon icon="triangle-exclamation"></AppIcon>
                    Estas a punto de eliminar el {page === 'users' ? 'usuario' : 'elemento'}
                    <span className="fw-bold">{dataDelete.name ? dataDelete.name : dataDelete.elementName}</span>
                </div>
                <div className="action-footer">
                    <AppButton outlined variant="dark" onClick={onClose}>Cancelar</AppButton>
                    <AppButton variant="danger" onClick={handleDelete}>Confirmar</AppButton>
                </div>
            </div>
        </ConfirmActionStyle>
    )
}

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