import { useEffect, useState } from "react";
import useSound from "use-sound";
import { Snackbar, Button } from "@mui/material";

export default function Alerts() {
  const [playBellAlert] = useSound("/bell.wav", { volume: 0.3 });

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const [notificationDownPageRow, setNotificationDownPageRow] = useState({
    message: "",
  });

  console.log(notificationDownPageRow);

  // Row highlight alert
  useEffect(() => {
    const table = document.querySelector(".MuiTable-root");
    const table1 = document.querySelector(".table-page-one");
    const table2 = document.querySelector(".table-page-two");

    const observer = new MutationObserver((mutations) => {
      mutations.map((record) => {
        const parentNodeValue = record.target.parentNode;

        const cellPriority =
          parentNodeValue.attributes[1] &&
          parentNodeValue.attributes[1].nodeValue
            ? parentNodeValue.attributes[1].nodeValue
            : "Confirmé";

        const cellPriority2 =
          parentNodeValue.parentNode.parentNode.attributes[1] &&
          parentNodeValue.parentNode.parentNode.attributes[1].nodeValue
            ? parentNodeValue.parentNode.parentNode.attributes[1].nodeValue
            : "Confirmé";

        const hasSome = (itemClass, value) => {
          return (
            itemClass &&
            Array.from(itemClass).some((v) => {
              return v.indexOf(value) >= 0;
            })
          );
        };

        const cellTag = () => {
          switch (true) {
            //Html cell  alert
            case parentNodeValue.localName === "p" &&
              parentNodeValue.localName !== "button":
              return document.querySelector(
                `.${parentNodeValue.parentNode.classList[4]}`
              );

            //Marquee alert
            case hasSome(
              parentNodeValue.parentNode.parentNode.classList,
              "marquee-wrap"
            ):
              return document.querySelector(
                `.${parentNodeValue.parentNode.parentNode.classList[4]}`
              );

            //Regular cell alert
            case parentNodeValue.localName !== "p":
              return document.querySelector(`.${parentNodeValue.classList[4]}`);

            case parentNodeValue.localName === "p":
              return document.querySelector(
                `.${parentNodeValue.parenNode.classList[4]}`
              );

            default:
              return "";
          }
        };

        const cellStateChanged = cellTag();

        cellStateChanged &&
          [cellStateChanged].map((cell) => {
            if (cellPriority === "Confirmé" || cellPriority2 === "Confirmé") {
              cell.classList.add("alerted-red");
            }

            if (cellPriority === "Urgent" || cellPriority2 === "Urgent") {
              playBellAlert();
              return cell.classList.add("alerted-red");
            }

            if (
              cellPriority === "Réservation" ||
              cellPriority2 === "Réservation"
            ) {
              cell.classList.add("alerted-red");
            }

            if (cellPriority === "Approuvé" || cellPriority2 === "Approuvé") {
              cell.classList.add("alerted-red");
            }

            if (parseInt(cell.classList[4].split("-")[2]) >= 3) {
              console.log(cell);
              setOpen(true);
              setNotificationDownPageRow({
                message: `Modification ${
                  parseInt(cell.classList[4].split("-")[2]) + 1
                }ième film`,
              });
            }
          });

        setTimeout(() => {
          cellStateChanged &&
            [cellStateChanged].map((cell) => {
              cell.classList.remove("alerted-red");
              cell.classList.remove("alerted-red");
              cell.classList.remove("alerted-red");
            });
        }, 43200000); // Alert highlight duration
      });
    });

    table &&
      observer.observe(table, {
        attributes: false,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false,
      });

    table1 &&
      observer.observe(table1, {
        attributes: false,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false,
      });

    table2 &&
      observer.observe(table2, {
        attributes: false,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false,
      });
  }, [playBellAlert]);

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        RETIRER
      </Button>
    </>
  );
  return (
    <Snackbar
      style={{ top: 10 }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={60000}
      onClose={handleClose}
      message={notificationDownPageRow.message}
      action={action}
      ContentProps={{
        sx: {
          opacity: 0.5,
          background: "#288feb",
          padding: "4px 8px",
        },
      }}
    />
  );
}
