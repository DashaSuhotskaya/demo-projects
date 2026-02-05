export default function getValidator() {
  const validator = new JustValidate("#form");

  validator
    .addField("#name", [
      {
        rule: "required",
      },
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "maxLength",
        value: 20,
      },
    ])
    .addField("#email", [
      {
        rule: "required",
      },
      {
        rule: "required",
      },
      {
        rule: "email",
      },
    ])
    .addField("#agree", [
      {
        rule: "required",
      },
    ]);

  const form = document.querySelector("#form");
  const modal = document.querySelector("#modal");
  const modalText = document.querySelector("#modalText");
  const modalClose = document.querySelector("#modalClose");

  function showModal(message) {
    modalText.textContent = message;
    modal.classList.add("modal--active");
  }

  modalClose.addEventListener("click", () => {
    modal.classList.remove("modal--active");
  });

  validator.onSuccess(async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showModal("Заявка успешно отправлена!");
        form.reset();
      } else {
        showModal("Ошибка при отправке. Попробуйте позже.");
      }
    } catch (error) {
      showModal("Не удалось отправить данные. Проверьте соединение.");
    }
  });
}
