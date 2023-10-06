import ClearFilters from "./ClearFilters";
import SortBy from "./SortBy";
import ResultsPerPage from "./ResultsPerPage";
import Age from "./Age";
import ZipCodes from "./ZipCodes";
import './Filters.css';

function Filters() {
    return (
        <div className='filters'>
            <ClearFilters />
            <SortBy />
            <ResultsPerPage />
            <Age />
            <ZipCodes />
        </div>
    );
};

export default Filters;