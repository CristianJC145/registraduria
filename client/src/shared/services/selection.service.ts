export class SelectionService {
    private selectedOption: string = '';
  
    getSelectedOption() {
        return this.selectedOption;
    }
  
    setSelectedOption(option: string) {
        this.selectedOption = option;
    }
}