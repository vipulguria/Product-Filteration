import React, { useState, useEffect } from "react";
import './Home.css';


function Home(props) {
    const [products, setProducts] = useState([]);
    const [updatedProduct, setUpdatedProduct] = useState([]);
    const [flag, setFlag] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const filteredCategory = [];
    const filteredGender = [];
    const filteredBrand = [];




    useEffect(() => {
        fetch("https://demo7242716.mockable.io/products")
            .then(res => res.json())
            .then((data) => {
                setProducts(data.products);
            });
    }, [])


    const filterCategoryBox = (e) => {
        if (selectedCategory.includes(e.target.value)) {
            var index = selectedCategory.indexOf(e.target.value);
            if (index !== -1) {
                selectedCategory.splice(index, 1);
            }
        } else {
            selectedCategory.push(e.target.value);
        }

        setUpdatedProduct(products.filter((item) => {
            return selectedCategory.includes(item.category);
        }));

        if (selectedCategory.length == 0) {
            setFlag(false);
        } else {
            setFlag(true)
        }
    }


    const filterRadio = (e) => {
        console.log(e.target.value);
        setUpdatedProduct(products.filter((item) => {
            return item.gender == e.target.value;
        }))
        setFlag(true);
    }



    const filterBrandBox = (e) => {
        if (selectedBrand.includes(e.target.value)) {
            var index = selectedBrand.indexOf(e.target.value);
            if (index !== -1) {
                selectedBrand.splice(index, 1);
            }
        } else {
            selectedBrand.push(e.target.value);
        }

        setUpdatedProduct(products.filter((item) => {
            return selectedBrand.includes(item.brand);
        }));
        if (selectedBrand.length == 0) {
            setFlag(false);
        } else {
            setFlag(true)
        }

    }

    const defaultDisplay = () => {
        if (selectedBrand.length == 0 && selectedCategory.length == 0) {
            setFlag(false);
        }
    }



    return (
        <>
            <div class="col-sm-3">
                <h5>FILTERS</h5>
                <hr />
                <div class="form-check gender">
                    {products.map((item) => {
                        if (!(filteredGender.includes(item.gender))) {
                            filteredGender.push(item.gender)
                        }
                    })}
                    {filteredGender.map((item) => {
                        return (
                            <div class="form-check" >
                                <input onClick={filterRadio} class="form-check-input" type="radio" name="type" value={item} />
                                <label class="form-check-label" for={item}>&nbsp;<b>{item}</b></label><br />
                            </div>
                        );
                    })}
                </div>


                <h5>CATEGORIES</h5>
                <div class="scroll">
                    {products.map((item) => {
                        if (!(filteredCategory.includes(item.category))) {
                            filteredCategory.push(item.category)
                        }
                    })}
                    {filteredCategory.map((item) => {
                        return (
                            <div class="form-check">
                                <input onClick={defaultDisplay} onClick={filterCategoryBox} class="form-check-input" type="checkbox" value={item} id={item} />
                                <label class="form-check-label" for={item}>&nbsp;{item}</label><br />
                            </div>
                        );
                    })}
                </div>



                <h5>BRAND</h5>
                <div class="scroll">
                    {products.map((item) => {
                        if (!(filteredBrand.includes(item.brand))) {
                            filteredBrand.push(item.brand)
                        }
                    })}
                    {filteredBrand.map((item) => {
                        return (
                            <div class="form-check">
                                <input onClick={defaultDisplay} onClick={filterBrandBox} class="form-check-input" type="checkbox" value={item} id={item} />
                                <label class="form-check-label" for={item}>&nbsp;{item}</label><br />
                            </div>
                        );
                    })}
                </div>
            </div>





            <div class="col-sm-9">

                <select class="form-select" >
                    <option selected>Sort By: Recommended</option>
                    <option value="1">Price</option>
                    <option value="2">Year</option>
                    <option value="3">Rating</option>
                </select>

                <div class="card-container">
                    {console.log(updatedProduct)}
                    {flag ? (
                        updatedProduct.map((product) => {
                            return (
                                <div class="card">
                                    <img class="card-img-top" src={product.images[0].src} alt="Loading.." />
                                    <div class="card-body">
                                        <div class="card-title"><b>{product.brand}</b></div>
                                        <div class="card-desc"><small class="text-muted">{product.additionalInfo}&nbsp;</small></div>
                                        <div class="card-text"><b>Rs.{product.price}</b><small class="text-muted"> <del>Rs.{product.mrp}</del> {product.discountDisplayLabel}</small></div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        products.map((product) => {
                            return (
                                <div class="card">
                                    <img class="card-img-top" src={product.images[0].src} alt="Loading.." />
                                    <div class="card-body">
                                        <div class="card-title"><b>{product.brand}</b></div>
                                        <div class="card-desc"><small class="text-muted">{product.additionalInfo}&nbsp;</small></div>
                                        <div class="card-text"><b>Rs.{product.price}</b><small class="text-muted"> <del>Rs.{product.mrp}</del> {product.discountDisplayLabel}</small></div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;

