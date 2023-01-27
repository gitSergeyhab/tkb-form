addItemBtn.addEventListener('click', addTemplateElementToList);

form.addEventListener('click', deleteElement);

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formInputs = form.querySelectorAll('.person-list__input');
    formInputs.forEach(showError);
    const isFormOk = [...formInputs].every(checkField);
    if (isFormOk) {
        const body = getJSONArrayFormData(form);
        console.log({JSONDataFromForm: body})
        postData({body});
    } 
})