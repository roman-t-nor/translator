export default () => ({
    checkboxes: [],
    isEveryElementsChecked: false,
    init() {
        this.checkboxes = Array.from(
            this.$root.querySelectorAll("tbody .form-check-input"),
        );
        this.$root.addEventListener("click", (event) => {
            if (event.target.className === "form-check-input") {
                this.isEveryElementsChecked = this.checkboxes.every(
                    (cb) => cb.checked,
                );
                this.$dispatch(
                    "is-every-element-unchecked",
                    this.checkboxes.every((cb) => !cb.checked),
                );
            }
        });
    },
    toggleEveryElementsChecked($event) {
        this.checkboxes.forEach((cb) => (cb.checked = $event.target.checked));
    },
});
