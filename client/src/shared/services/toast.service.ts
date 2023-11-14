import toastStore from '../stores/toast.store';

export class ToastService {
    show(message: string, type: string = 'success') {
        toastStore().methods.show(message, type);
    }

    hide() {
        toastStore().methods.hide();
    }
}