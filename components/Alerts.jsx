import { useEffect } from "react";
import useSound from "use-sound";

export default function Alerts() {
  const [playBellAlert] = useSound("/bell.wav", { volume: 0.3 });

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
            case parentNodeValue.localName === "p" &&
              hasSome(parentNodeValue.parentNode.classList, "cell-marquee"):
              return document.querySelector(
                `.${parentNodeValue.parentNode.parentNode.parentNode.parentNode.classList[4]}`
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
            if (cellPriority === "Confirmé") {
              cell.classList.add("alerted-green");
            }

            if (cellPriority === "Urgent") {
              playBellAlert();
              return cell.classList.add("alerted-red");
            }

            if (cellPriority === "Non-confirmé") {
              cell.classList.add("alerted-yellow");
            }
          });

        setTimeout(() => {
          cellStateChanged &&
            [cellStateChanged].map((cell) => {
              cell.classList.remove("alerted-green");
              cell.classList.remove("alerted-red");
              cell.classList.remove("alerted-yellow");
            });
        }, 30000); // Alert highlight duration
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
}