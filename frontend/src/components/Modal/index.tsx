import "./index.module.scss";
import React from "react";
import { CATEGORIES } from "../FormDashboard/categories";
import Icon from "@/components/Icon/Index";
export default function Modal({
  selectedTab,
  isCategoriesModalOpen,
  category,
  dispatch,
}: any) {
  return (
    <div className={`modal${isCategoriesModalOpen ? " open" : ""}`}>
      <div className="modal__container">
        <div className="modal__header">Seleccione la categoría</div>
        <div className="modal__categories">
          <div className="categories">
            {CATEGORIES.map(
              ({ name, type: isIncome, id }, i: number) =>
                selectedTab === isIncome && (
                  <button
                    className={`categories__item${category === name ? " selected" : ""}`}
                    key={i}
                    data-tab={name}
                    onClick={(e) => {
                      dispatch({
                        type: "setCategory",
                        payload: e.currentTarget.dataset.tab,
                      });
                      dispatch({ type: "closeCategoriesModal" });
                    }}
                  >
                    <svg>
                      <use href={`Icons/sprite.svg#${id}`}></use>
                    </svg>
                    <span>{name}</span>
                  </button>
                ),
            )}
          </div>
        </div>
        <div className="modal__actions">
          <button onClick={() => dispatch({ type: "closeCategoriesModal" })}>
            Cancelar
          </button>
        </div>
        <button
          className="modal__close-btn"
          onClick={() => dispatch({ type: "closeCategoriesModal" })}
        >
          <Icon id="close" />
        </button>
      </div>
    </div>
  );
}
