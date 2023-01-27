const ErrorMessage = {
    EmptyField: 'поле должно быть заполнено',
    NotCorrectName: 'ФИО - 3 слова кирилицей от 2 до 32 символов',
    NotCorrectField: 'не корректное значение',
    NotCorrectPosition: 'выберете должность из списка',
    NotCorrectAge: 'возраст должен быть числом - от 18 до 99',
    NotCorrectLengthSkills: 'хотя бы двадцать символов',
}

const ServerMessage = {
    Ok: 'Данные успешно отправлены',
    ServerError: 'Ошибка сервера. Попробуйте позже',
    Error: 'Что-то пошло не так. Попробуйте позже'

}

const InputType = {
    Name: 'name',
    Position: 'position',
    Age: 'age'
}

const NAME_PATTERN = /[ЁёА-я]{2,32}/;

const POSITIONS = ['менеджер', 'юрист', 'программист', 'аналитик'];

const SERVER_URL = 'php.php';