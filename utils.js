const addTemplateElementToList = () => {
    const newLi = newItemTemplate.content.cloneNode(true);
    personList.append(newLi);
    activateSubmit(true);
}

const deleteElement = (evt) => {
    const element = evt.target.closest('.person-list__row');
    if (evt.target.classList.contains('person-list__delete-btn') && element) {
        element.remove();
        if (!form.querySelectorAll('.person-list__row').length) {
            activateSubmit(false)
        }
    }
}

/**
 * собирает в массив данные из формы
 * @param {Element} form 
 * @returns {string}
 */

const getJSONArrayFormData = (form) => {
    const formData = new FormData(form);

    const dataArray = [];
    let obj = {};
    for (const [key, value] of formData) {
        obj[key] = value;
        if (key === 'skills') {
            dataArray.push(obj);
            obj = {};
        }
    }
    return JSON.stringify(dataArray);
}  

/**
 * по классу определяет тип инпута
 * @param {Element} element 
 * @returns {string | null}
 */
const getFieldType = (element) => {
    const {classList} = element;
    if (classList.contains('person-list__input_name')) {
        return InputType.Name
    }

    if (classList.contains('person-list__input_position')) {
        return InputType.Position
    }

    if (classList.contains('person-list__input_age')) {
        return InputType.Age
    }
}

const showServerMessage = (element, text) => {
    element.textContent = text;
    setTimeout(() => element.textContent = '', 3000)
};

const showServerError = (message) => showServerMessage(messageError, message);
const showServerOk = () => showServerMessage(messageOk, ServerMessage.Ok);

const onSuccessPost = (res) => {
    const {status} = res;
    if (res.ok) {
        return res;
    } 
    throw new Error(`Что-то пошло не так. Error status: ${status}`)
}

const onSuccessAll= (data) => {
    console.log({DataFromServer: data})
    if (!data) {
        throw new Error(ServerMessage.ServerError)
    }

    showServerOk();
    form.reset();
    const liElements = form.querySelectorAll('.person-list__row');
    const liCount = liElements.length;
    if (liCount) {
        for (let i=0; i < liCount - 1; i++) {
            liElements[i].remove();
        }
    }
}

const getJSONfromResponse = async(res) => {
    try {
        return await res.json()
    } catch {
        throw new Error(ServerMessage.ServerError)
    }
}


const activateSubmit = (active = true) => {
    if (active) {
        submitBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', '');
    }
}

const postData = ({body}) => {
    activateSubmit(false);
    fetch(SERVER_URL, {method: 'POST', body})
        .then(onSuccessPost)
        .then(getJSONfromResponse)
        .then(onSuccessAll)
        .catch(showServerError)
        .finally(activateSubmit)
}