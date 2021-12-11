import iziToast from "izitoast";

const alertSucees = (mensaje="Operación exitosa", bodyAlert="¡Guardado!") => {
  iziToast.show({
    title: bodyAlert,
    message: mensaje,
    color: "white",
    position: "topRight",
    icon: "far fa-check-circle",
  });
};

const alertErrorMessage = (mensaje="Revise los datos", bodyAlert="¡Error!") => {
  iziToast.show({
    title: bodyAlert,
    message: mensaje,
    color: "red",
    position: "topRight",
    icon: "far fa-check-circle",
  });
};

const alertError = () => {
  iziToast.show({
    title: "¡ATENCiÓN!",
    message: "Ha ocurrido un error",
    color: "white",
    position: "topRight",
    overlayColor: 'rgba(0, 0, 0, 0.1)',
    icon: "far fa-check-circle",
    backgroundColor: '#FFF',
    titleColor: '#545454',
    iconColor: '#a9a9a9',
    messageColor: '#545454',
    overlay: true,
    overlayClose: true,
  });
};

const alertWarning = (d) => {
  iziToast.show({
    title: "¡Cuidado!",
    message: "¿Está a punto de elimanar el siguiente registro: ",
    color: "red",
    position: 'topRight',
    icon: "far fa-check-circle",
    timeout: 0,
    buttons: [
      [
        "<button>OK</button>",
        function (instance, toast) {
          d();
          alert("Hello world!");
          instance.hide(
            {
              transitionOut: "fadeOutUp",
              onClosing: function (instance, toast, closedBy) {
                console.info("closedBy: " + closedBy); // The return will be: 'closedBy: buttonName'
              },
            },
            toast,
            "buttonName"
          );
          
        },
        true,
      ], // true to focus
      [
        "<button>Cancelar</button>",
        function (instance, toast) {
          instance.hide(
            {
              transitionOut: "fadeOutUp",
              onClosing: function (instance, toast, closedBy) {
                console.info("closedBy: " + closedBy); // The return will be: 'closedBy: buttonName'
              },
            },
            toast,
            "buttonName"
          );
        },
      ],
    ],
    
  });
};

const alerts = {
  alertSucees, 
  alertError, 
  alertWarning, 
  alertErrorMessage
}

export default alerts;