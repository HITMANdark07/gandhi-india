export const addWish = (item, next) => {
    let wish= [];
    if(typeof window!== 'undefined') {
        if(localStorage.getItem('wish')){
            wish = JSON.parse(localStorage.getItem('wish'))
        }
        wish.push({
            ...item
        });

        wish = Array.from(new Set(wish.map((p)=> (p._id)))).map((id) => {
            return wish.find(p => p._id === id);
        });

        localStorage.setItem('wish', JSON.stringify(wish));
        next();
    }
};

export const wishTotal = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('wish')) {
            return JSON.parse(localStorage.getItem('wish')).length
        }
    }
    return 0;
};

export const getWish = () => {
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('wish')) {
            return JSON.parse(localStorage.getItem('wish'));
        }
    }
    return [];
};


export const removeWish = (productId) => {
    let wish = [];
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('wish')) {
            wish = JSON.parse(localStorage.getItem('wish'))
        }
        wish.forEach((product, i) => {
            if(product._id === productId) {
                wish.splice(i, 1)
            }
        });
        localStorage.setItem('wish', JSON.stringify(wish));
    }
    return wish;
};