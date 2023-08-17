const ValidateForm = (formData) => {
   const errors = {};

   // la longitud mínima del título
   if (formData.name.length < 5) {
      errors.name = "Title must contain at least 5 characters.";
   }
   // Que no tenga 4 números seguidos
   if (!isNaN(formData.name)) {
      errors.name = "The title cannot be a number.";
   }
   if (!/^(?!(?:.*\d){5})[a-zA-Z\d\s]+$/.test(formData.name)) {
      errors.name = "The title cannot contain more than 4 consecutive digits.";
   }

   if (formData.summary.length < 10) {
      //la longitud mínima de la descripción
      errors.summary = "Description must contain at least 10 characters.";
   }

   // al menos un paso agregado
   if (formData.steps.length === 0) {
      errors.steps = "Add at least 1 step.";
   }

   // si se ingreso una URL de imagen
   if (
      !/^(http|https):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif)$/.test(
         formData.image
      )
   ) {
      errors.image = "Add a link to an image (jpg|jpeg|png|gif).";
   }

   // el rango de healthscore
   if (formData.healthscore < 1 || formData.healthscore > 100) {
      errors.healthscore = "Healthscore must be between 1 and 100.";
   }

   // al menos una dieta agregada
   if (formData.diets.length === 0) {
      errors.diets = "Add at least 1 diet.";
   }

   return errors;
};

export default ValidateForm;
