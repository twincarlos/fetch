import { useContext } from "react";
import { ParametersContext } from "../../../../context/Parameters";

export default function ClearFilters() {
    const {
        searchParams, setSearchParams,
        setMinAgeInput, setMaxAgeInput,
        setZipCodeInput, setZipCodes,
        setSortingCategory, setSortingType,
        setSortedBreeds, setSize
    } = useContext(ParametersContext);

    function clearAllFilters() {
        setSortingCategory('breed');
        setSortingType('asc');
        setSize('25');
        setMinAgeInput('0');
        setMaxAgeInput('20');
        setZipCodeInput('');
        setZipCodes([]);
        setSortedBreeds([]);

        searchParams.set('sort', 'breed:asc');
        searchParams.set('size', '25');
        searchParams.delete('ageMin');
        searchParams.delete('ageMax');
        searchParams.delete('zipCodes');
        searchParams.delete('breeds');
        setSearchParams(searchParams);
    };

    return (
        <div className='filter clear-filters'>
            <button className='puff' onClick={clearAllFilters}>
                <span className="material-symbols-outlined">restart_alt</span>
                Clear filters
            </button>
        </div>
    );
};