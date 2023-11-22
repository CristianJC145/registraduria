export class UpdateDatatableService {
    run() {
        const event = new Event('updateDatatable');

        document.dispatchEvent(event);
    }
}