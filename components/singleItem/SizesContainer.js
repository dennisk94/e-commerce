import classes from './SizesContainer.module.css';

const SizesContainer = ({sizes, sizesEventHandler}) => {

    const sizeEventHandler = (e) => {
        sizesEventHandler(e.target.value);
    }

    return (
        <div>
            <h3>
                Available Sizes
            </h3>
        
            {
                sizes.map( (size, i) => <button className={classes.button} type='button' key={ i } value={ size.size } onClick={sizeEventHandler}>{size.size}</button>)
            }
        </div>
    )
}

export default SizesContainer;