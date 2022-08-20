import React from "react";

const Categories = ({changeCategory,pizzaCategoryIndex}) => {
    const pizzas = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

    return (
        <div className="categories">
            <ul>
                {pizzas.map((el, index) => {
                    return <li key={index} onClick={() => changeCategory(index)}
                               className={pizzaCategoryIndex === index ? 'active' : ''}>
                        {el}
                    </li>
                })}
            </ul>
        </div>
    );
};

export default Categories;