import $ from 'jquery';

export const get = (query) => {
  return $.get(query);    
}