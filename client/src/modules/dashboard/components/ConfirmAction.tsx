import styled from "styled-components";
import AppButton from "../../../shared/components/Buttons/AppButton";

import { toast } from "react-toastify";
import AppIcon from "../../../shared/components/AppIcon";
import { DeleteUserByIdService } from "../services/deleteUserById.service";

interface ConfirmActionProps {
    userDataDelete?: any;
    onClose: () => void;
    onSave: () => void;
}

const deleteUserService = new DeleteUserByIdService();

const ConfirmAction: React.FC<ConfirmActionProps> = ({ onClose, userDataDelete, onSave }) => {
    const handleDelete = async() => {
        if (userDataDelete.id) {
            await deleteUserService.run(userDataDelete.id);
            onClose();
            onSave();
        }
        toast.success(`¡Se ha eliminado el usuaio ${userDataDelete.name} correctamente!`);
    }
    return (
        <ConfirmActionStyle>
            <div className="confirm-action">
                <div className="action-body">
                    <AppIcon icon="triangle-exclamation"></AppIcon>
                    Estas a punto de eliminar el usuario
                    <span className="fw-bold">{userDataDelete.name}</span>
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
        width: 350px;
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
            width: 400px;
        }
    }
`