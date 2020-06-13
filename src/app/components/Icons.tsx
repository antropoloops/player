import React from "react";

const DEFAULT_SIZE = 24;

interface IconProps {
  className?: string;
  color?: string;
  size?: string;
  onClick?: (event: any) => void;
}

const Icon = (name: string, path: string, viewBox = "0 0 512 512") => ({
  className = "",
  size,
  onClick,
}: IconProps) => (
  <svg
    className={`${className} icon ${name}-arrow`}
    width={size || DEFAULT_SIZE}
    height={size || DEFAULT_SIZE}
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox}
    onClick={onClick}
  >
    <path fill="currentColor" d={path} />
  </svg>
);

export const Stop = Icon(
  "stop",
  "M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm296-80v160c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16z"
);

export const ArrowUp = Icon(
  "up",
  "M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z"
);

export const ArrowDown = Icon(
  "down",
  "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z"
);

export const ArrowLeft = Icon(
  "left",
  "M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"
);
export const ArrowRight = Icon(
  "right",
  "M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"
);

// https://thenounproject.com/search/?q=info&i=223370
export const Info = Icon(
  "info",
  "M16.5,16.5C-2,35-2,65,16.5,83.5C35,102,65,102,83.5,83.5C102,65,102,35,83.5,16.5C65-2,35-2,16.5,16.5z M51.9,22.5  c4,0,7.2,3.3,7.2,7.3c0,4-3.3,7.3-7.2,7.3c-4,0-7.3-3.3-7.3-7.4C44.6,25.7,47.9,22.5,51.9,22.5z M62.2,71.4c-0.2,0.6-0.6,1.3-1,1.7  c-2.6,2.7-5.8,4.3-9.6,4.3c-1.8,0-3.5,0-5.3-0.3c-2.9-0.4-6.6-4-6.1-7.8c0.4-2.6,0.8-5.2,1.2-7.8c0.8-4.5,1.6-9.1,2.4-13.6  c0-0.3,0.1-0.6,0.1-0.9c0-1.9-0.6-2.6-2.5-2.8c-0.8-0.1-1.6-0.2-2.4-0.4c-0.9-0.3-1.4-1.1-1.3-1.8c0.1-0.8,0.6-1.3,1.6-1.5  c0.5-0.1,1.1-0.1,1.7-0.1c2.2,0,4.4,0,6.7,0c2.4,0,4.7,0,7.1,0c1.7,0,2.7,0.8,2.7,2.5c0,1.4-0.2,2.8-0.5,4.2  c-0.9,5.2-1.9,10.3-2.8,15.5c-0.3,1.7-0.7,3.4-0.9,5.1c-0.1,0.8,0,1.7,0.2,2.5c0.3,1.1,1.1,1.7,2.2,1.6c0.9-0.1,1.8-0.4,2.7-0.8  c0.7-0.3,1.3-0.8,2-1C61.6,69.6,62.5,70.3,62.2,71.4z",
  "0 0 100 100"
);

export const GearIcon = Icon(
  "options",
  "M84.474,54.251c-0.392-0.401-0.388-8.131,0.006-8.521c0,0,7.921-4.636,7.996-4.708c1.266-1.227,1.847-3.497,1.324-5.168  c-0.011-0.037-0.025-0.072-0.039-0.108l-2.764-6.678c-0.013-0.033-0.029-0.066-0.045-0.098c-0.801-1.552-2.784-2.767-4.554-2.767  c-0.113,0-9.138,2.412-9.138,2.412c-0.774-0.132-5.862-5.699-5.884-6.031c0,0,2.323-8.863,2.324-8.967  c0.028-1.764-1.167-3.773-2.72-4.574c-0.031-0.016-0.064-0.031-0.097-0.045l-6.655-2.763c-0.035-0.014-0.07-0.027-0.106-0.039  c-1.627-0.515-3.971,0.093-5.159,1.323c-0.072,0.075-4.706,8.002-4.706,8.002c-0.403,0.392-8.019,0.414-8.525-0.023  c0,0-4.62-7.905-4.692-7.979c-1.187-1.229-3.527-1.835-5.157-1.325c-0.036,0.012-0.073,0.025-0.108,0.04l-6.655,2.764  c-0.033,0.014-0.065,0.029-0.097,0.045c-1.553,0.801-2.748,2.81-2.72,4.574c0.001,0.104,2.33,8.989,2.33,8.989  c-0.007,0.201-5.238,5.904-5.918,6.001c0,0-9.037-2.405-9.151-2.405c-1.73,0-3.713,1.215-4.514,2.767  c-0.016,0.033-0.032,0.066-0.046,0.1l-2.763,6.701c-0.013,0.034-0.027,0.069-0.038,0.104c-0.528,1.68,0.062,3.955,1.344,5.178  c0.059,0.056,8.009,5.22,8.009,5.22c0.373,0.424,0.379,7.497-0.051,7.991c0,0-7.904,4.62-7.979,4.692  c-1.266,1.226-1.846,3.492-1.323,5.157c0.012,0.037,0.025,0.073,0.04,0.108l2.763,6.655c0.013,0.033,0.029,0.065,0.044,0.097  c0.788,1.525,2.773,2.72,4.57,2.72c0.001,0,8.995-2.332,8.995-2.332c0.714,0.008,5.99,5.712,6.012,6.043  c0,0-2.323,8.863-2.324,8.967c-0.028,1.764,1.167,3.773,2.72,4.574c0.031,0.016,0.064,0.031,0.097,0.045l6.655,2.763  c0.035,0.014,0.07,0.027,0.106,0.039c1.627,0.515,3.97-0.094,5.159-1.323c0.072-0.075,4.706-8.003,4.706-8.003  c0.403-0.392,8.014-0.415,8.525,0.024c0,0,4.62,7.904,4.692,7.978c0.891,0.921,2.392,1.517,3.825,1.517  c0.479,0,0.927-0.065,1.335-0.194c0.036-0.011,0.071-0.024,0.106-0.039l6.655-2.763c0.033-0.014,0.066-0.029,0.097-0.045  c1.553-0.801,2.748-2.81,2.72-4.574c-0.001-0.104-2.33-8.99-2.33-8.99c0.006-0.199,5.281-5.995,6.021-6.019  c0,0,8.903,2.331,9.014,2.331c1.762,0,3.76-1.195,4.548-2.72c0.015-0.031,0.031-0.064,0.044-0.097l2.764-6.655  c0.015-0.036,0.029-0.072,0.04-0.109c0.523-1.665-0.059-3.931-1.324-5.156C92.401,58.884,84.474,54.251,84.474,54.251z   M49.713,73.534c-12.572,0-22.8-10.229-22.8-22.801c0-12.573,10.228-22.802,22.8-22.802c12.573,0,22.801,10.229,22.801,22.802  C72.514,63.305,62.286,73.534,49.713,73.534z",
  "0 0 100 125"
);

export const FullscreenIcon = ArrowUp;
