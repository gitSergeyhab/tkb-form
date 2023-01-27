
/**
 * @param {string} name 
 * @returns {boolean}
 */
const checkName = (name) => NAME_PATTERN.test(name);


const getNameError = (name) => {
    if (!name) {
        return ErrorMessage.EmptyField;
    }

    const nameArr = name.split(' ').filter((item) => item);

    if (nameArr.length !== 3 || nameArr.some((item) => !checkName(item.trim()))) {
        return ErrorMessage.NotCorrectName;
    }
}

const getPositionError = (position) => {
    if (!position) {
        return ErrorMessage.EmptyField;
    }

    if (!POSITIONS.includes(position)) {
        return ErrorMessage.NotCorrectPosition;
    }
}

const getAgeError = (age) => {
    if (!age) {
        return ErrorMessage.EmptyField;
    }

    if (!+age || +age < 18 || +age > 99) {
        return ErrorMessage.NotCorrectAge;
    }
}

const getError = (element, inputType) => {
    const value = element.value.trim();
    switch (inputType) {
        case InputType.Age: return getAgeError(value);
        case InputType.Name: return getNameError(value);
        default: return getPositionError(value);
    }
}

/**
 * по element.value и классу определяет есть ли ошибка
 * @param {Element} element 
 */
const checkField = (element) => {
    const inputType = getFieldType(element);
    const error = getError(element, inputType);
    return !error;
}

/**
 * при ошибке красит бордер inputa и добавляет текст ошибки в соседний span
 * 
 * если ошибки нет, очищает спан, убирает цвет бордера
 * @param {Element} element 
 */
const showError = (element) => {
    const inputType = getFieldType(element);
    const error = getError(element, inputType);
    const span = element.parentElement.querySelector('.error-message');
    if (span && error) {
        span.textContent = error;
        element.classList.add('person-list__input_error');
    } else if (span) {
        span.textContent = '';
        element.classList.remove('person-list__input_error');
    }
}