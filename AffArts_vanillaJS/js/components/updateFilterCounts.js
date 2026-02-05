export default function updateFilterCounts(checkboxes, products) {
    checkboxes.forEach(checkbox => {
        const countElement = checkbox.closest('.custom-checkbox').querySelector('.custom-checkbox__count')
        let count = products.filter(product => product.type.includes(checkbox.value)).length;;
        countElement.textContent = count;
    });
}