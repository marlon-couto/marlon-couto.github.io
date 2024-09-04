// Habilita o botão de envio apenas se o formulário for válido.
export const validateForm = () => {
  const inputName = document.querySelector("#input-name");
  const inputEmail = document.querySelector("#input-email");
  const inputMessage = document.querySelector("#input-message");
  const contactBtn = document.querySelector("#contact-btn");
  const inputNameText = inputName.value.toString();
  const nameRegex = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/);
  const isValidName =
    nameRegex.test(inputNameText) && inputNameText.length >= 2;
  const emailRegex = new RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
  );
  const isValidEmail = emailRegex.test(inputEmail.value.toString());
  const isValidMessage = inputMessage.value.toString().length >= 10;
  if (isValidEmail && isValidMessage && isValidName) {
    contactBtn.disabled = false;
  } else {
    contactBtn.disabled = true;
  }
};

export const sendFormData = async (button) => {
  const name = document.querySelector("#input-name").value;
  const email = document.querySelector("#input-email").value;
  const message = document.querySelector("#input-message").value;
  await sendEmail(name, email, message);
  alert("Mensagem enviada com sucesso!");
  name = "";
  email = "";
  message = "";
  button.disabled = true;
}