import React, {useState, useEffect, useMemo, useCallback, useContext} from 'react';
import api from '../../../services/api'; 
import styles from './SearchAttraction.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField, InputAdornment } from '@mui/material';
import { AttractionContext } from '../../../context/AttractionContext';


const Search = () => {
    const [query, setQuery] = useState("");
    const { attractions, setFilterValuesAttractions } = useContext(AttractionContext);

    const namesOfAttractions = useMemo(() => {
      return attractions.map(attraction =>{
        return attraction.title;
      })
    }, [attractions]);

    const handleChange = (event, newValue) => {
        setQuery(newValue || "");
    };
    const changeDisplay = () => {
      setFilterValuesAttractions({
        continents: [],
        categories: [],
        title: query
      });
    }

    const handleOnkeydown = (event) => {
        if(event.key === "Enter"){
            changeDisplay();
        }
    }

    return (
        <div className={styles.search}>
            <div className={styles.searchBar}>
                <Autocomplete
                    freeSolo
                    size="small"
                    options={namesOfAttractions}
                    inputValue={query}
                    onInputChange={handleChange}
                    onChange={handleChange}
                    onKeyDown={handleOnkeydown}
                    style={{ width: 300, margin: '0 auto', display: 'block' }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Search attraction..."
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon onClick={changeDisplay} className={styles.searchIcon}/>
                                  </InputAdornment>
                                ),
                              }}
                        />
                    )}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "black", // Keep black on focus (click)
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "black", // Label color on focus
                        },
                      }}
                />
            </div>
        </div>
    );
};

export default Search;