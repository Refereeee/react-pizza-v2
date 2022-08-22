import React from 'react';
import Categories from "./Categories";
import Sort from "./Sort";
import Skeleton from "./PizzaBlock/Skeleton";
import PizzaBlock from "./PizzaBlock";
import Pagination from "./Pagination/Pagination";

const Home = ({searchValue}) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [pizzas, setPizzas] = React.useState([])
    const [pizzaCategoryIndex, setPizzaCategoryIndex] = React.useState(0);
    const category = pizzaCategoryIndex ? `category=${pizzaCategoryIndex}` : "";
    const [sortValue, setSortValue] = React.useState('rating')
    const [currentPage,setCurrentPage] = React.useState(1);

    const [selectItem, setSelectItem] = React.useState(0)

    const checkSearchValue = searchValue?`search=${searchValue}`:'';
    const checkOrder  = sortValue.includes('-') ? 'asc' : 'desc';
    const checkSort = sortValue.replace('-', '')



    React.useEffect(() => {
        setIsLoading(true)
        console.log(checkSearchValue)
        fetch(`https://62fe4adca85c52ee483464b0.mockapi.io/pizzas?${category}&sortBy=${checkSort}&order=${checkOrder}&${checkSearchValue}&page=${currentPage}&limit=4`)

            .then(res => res.json())
            .then(json => {
                setPizzas(json)
                setIsLoading(false)
            })
    }, [pizzaCategoryIndex,searchValue, sortValue,currentPage])
    return (
        <div className="container">
            <div className="content__top">
                <Categories pizzaCategoryIndex={pizzaCategoryIndex}
                            changeCategory={(index) => setPizzaCategoryIndex(index)}/>
                <Sort value={selectItem} changeSortItem={(i) => setSelectItem(i)}
                      setSortValue={(item) => setSortValue(item)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ?
                    [...new Array(6)].map(el => <Skeleton/>) :
                    pizzas.map(obj => {
                        return <PizzaBlock key={obj.id} {...obj}/>
                    })
                }
            </div>
            <Pagination onChange={(number)=>setCurrentPage(number)}/>
        </div>
    );
};

export default Home;