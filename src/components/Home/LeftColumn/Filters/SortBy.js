import { useContext } from "react";
import { ParametersContext } from "../../../../context/Parameters";

export default function SortBy() {
    const {
        searchParams, setSearchParams,
        sortingCategory, setSortingCategory,
        sortingType, setSortingType
    } = useContext(ParametersContext);

    function updateSortingCategoryParams(sortingCategoryParams) {
        searchParams.set('sort', `${sortingCategoryParams}:${sortingType}`);
        setSortingCategory(sortingCategoryParams);
        setSearchParams(searchParams);
    };

    function updateSortingTypeParams(sortingTypeParams) {
        searchParams.set('sort', `${sortingCategory}:${sortingTypeParams}`);
        setSortingType(sortingTypeParams);
        setSearchParams(searchParams);
    };

    return (
        <div className='filter sort-by'>
            <div className='sorting-category'>
                <label>Sort by:</label>
                <select
                    className='puff'
                    name='sorting-category'
                    onChange={e => updateSortingCategoryParams(e.target.value)}>
                    <option value='breed'>Breed</option>
                    <option value='age'>Age</option>
                    <option value='zip_code'>Zip code</option>
                    <option value='name'>Name</option>
                </select>
            </div>
            <div className='asc-desc'>
                <input
                    type='radio'
                    name='sorting-type'
                    value='asc'
                    checked={sortingType === 'asc'}
                    onChange={e => updateSortingTypeParams(e.target.value)}
                />
                <span className="material-symbols-outlined">
                    keyboard_arrow_up
                </span> Asc
                <input
                    type='radio'
                    name='sorting-type'
                    value='desc'
                    checked={sortingType === 'desc'}
                    onChange={e => updateSortingTypeParams(e.target.value)}
                />
                <span className="material-symbols-outlined">
                    keyboard_arrow_down
                </span> Desc
            </div>
        </div>
    );
};