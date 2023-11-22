import React from "react";
import styled from "styled-components";
import AppButton from "../Buttons/AppButton";
import AppIcon from "../AppIcon";
interface AppModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}
const AppModal : React.FC<AppModalProps> = ({ isOpen, onCancel, onConfirm }) => {
    return (
        <>
            {isOpen && (
                <AppModalStyles>
                    <div className="overlay"></div>
                    <div className="position-fixed" style={{top: 0, bottom: 0, left: 0, right: 0, zIndex: 6, display: "grid", alignItems: "center", width: "100%", justifyContent: "center"}}>
                        <div className="vs-modal">
                            <div className="vs-modal-header">
                                <AppIcon className="text-warning fs-4 me-2" icon="warning"></AppIcon>
                                <h1 className="vs-header-title">Confirmar Eliminación</h1>
                            </div>
                            <div className="vs-modal-body">
                                <span className="fs-6 fw-bold">¿Estás seguro de que deseas eliminar este producto?</span>
                            </div>
                            <div className="vs-modal-actions">
                                <AppButton className="px-3 py-2" outlined variant="dark" onClick={onCancel}>Cancelar</AppButton>
                                <AppButton className="px-3 py-2" variant="danger" onClick={onConfirm}>Confirmar</AppButton>
                            </div>
                        </div>
                    </div>
                </AppModalStyles>
            )}
        </>
    )
}
export default AppModal;

const AppModalStyles = styled.div`
    .vs-modal {
        position: fixed;
        background-color: #fff;
        border-radius: 14px;
        position: relative
    }
    .vs-modal-header {
        display: flex;
        align-items: center;
        padding: var(--p-6) var(--p-8);
        border-bottom: 1px solid #e2e2e2;
    }
    .vs-header-title {
        color: var(--color-gray-800);
        font-weight: bold;
        font-size: 1.5rem;
        margin-bottom: 0;
    }
    .vs-modal-body {
        padding: var(--p-6) var(--p-8);
    }

    .vs-modal-actions {
        display: flex;
        justify-content: right;
        gap: 0.5rem;
        padding: 0 var(--p-8) var(--p-8) var(--p-8);
    }
`