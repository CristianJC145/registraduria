import styled from "styled-components";
import AppCard from "../../../shared/components/AppCard/AppCard";
import AppIcon from "../../../shared/components/AppIcon";
import AppButton from "../../../shared/components/Buttons/AppButton";


const BuyProductPage = () => {
    return (
        <BuyProductPageStyle>
            <div className="vs-buy-container">
                <div className="vs-container-left__col">
                    <div>
                        <div className="vs-col-payment">
                            <h4>Elige tu forma de pago</h4>
                            <AppCard className="vs-selection-payment my-4">
                                <div className="vs-payment-card">
                                    <div className="vs-card-radio">
                                        <input type="radio" />
                                    </div>
                                    <div className="vs-card-text">
                                        <AppIcon icon="credit-card"></AppIcon>
                                        <span className="ms-2">Tarjeta de crédito / débito</span>
                                    </div>
                                </div>
                            </AppCard>
                            <h4>Otras formas de pago</h4>
                            <AppCard className="d-flex flex-column my-4">
                                <div className="vs-payment-card">
                                    <div className="vs-card-radio">
                                        <input type="radio" />
                                    </div>
                                    <div className="vs-card-text">
                                        <AppIcon icon="landmark"></AppIcon>
                                        <span className="ms-2">Transferencia desde banco con PSE</span>
                                    </div>
                                </div>
                                <div className="vs-payment-card line">
                                    <div className="vs-card-radio">
                                        <input type="radio" />
                                    </div>
                                    <div className="vs-card-text">
                                        <AppIcon icon="money-bill"></AppIcon>
                                        <span className="ms-2">Pago en efectivo en ubicación cercana</span>
                                    </div>
                                </div>
                            </AppCard>
                            <div className="vs-button-pay">
                                <AppButton label="Continuar"></AppButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vs-container-right__col">
                    <AppCard body={
                        <div className="vs-col-order">
                            <h4 className="vs-order-title">Resumen de compra</h4>
                            <div className="d-flex flex-row justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>$100.000</span>
                            </div>
                            <div className="d-flex flex-row justify-content-between mb-3">
                                <span>Envío</span>
                                <span>0</span>
                            </div>
                            <div className="vs-order-total">
                                <span>Total</span>
                                <span>$100.000</span>
                            </div>
                        </div>
                    }/>
                </div>
            </div>
        </BuyProductPageStyle>
    )
}
export default BuyProductPage;

const BuyProductPageStyle = styled.div`
    .vs-buy-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        max-width: 1190px;
        padding-top: var(--p-4);
        margin: auto;
        gap: 2rem;
    }
    .vs-container-left__col {
        padding: var(--p-4) var(--p-2);
        width: calc(100% - 410px);
    }
    .vs-container-right__col {
        width: 410px;
        flex: 1;
    }
    .vs-payment-card {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin: var(--p-5) 0;
    }
    .vs-col-order {
        display: flex;
        flex-direction: column;
    }
    .vs-button-pay {
        float: right;
    }
    .vs-order-title {
        padding-bottom: var(--p-5);
        border-bottom: 1px solid rgba(0,0,0, .1);
        margin-bottom: 1rem;
    }
    .vs-order-total {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(0,0,0, .1);
    }
    .line {
        padding-top: 2rem;
        border-top: 1px solid rgba(0,0,0, .1);
    }
`