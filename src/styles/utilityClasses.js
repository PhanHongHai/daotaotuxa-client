const utilityClasses = () => {
	const data = [...Array(100).keys()].reduce(
		(returnValue, currentValue) =>
			returnValue.concat(
				`
        
      .mh-${currentValue}{
        min-height: ${currentValue}px !important;
      }
      .mt-${currentValue}{
        margin-top:${currentValue}px !important;
      }
      .mb-${currentValue}{
        margin-bottom:${currentValue}px !important;
      }
      .ml-${currentValue}{
        margin-left:${currentValue}px !important;
      }
      .mr-${currentValue}{
        margin-right:${currentValue}px !important;
      }
      .pd-${currentValue}{
        padding:${currentValue}em !important;
      }
      .pd-rl-${currentValue}{
        padding:0 ${currentValue}em 0 ${currentValue}em;
      }
      .pd-tb-${currentValue}{
        padding: ${currentValue}em 0 ${currentValue}em 0;
      }
      .pd-b-${currentValue}{
        padding-bottom: ${currentValue}em !important;
      }
     .loading-margin-${currentValue}{
       margin:${currentValue}% auto !important;
     }
      `,
			),
		'',
	);
	return data;
};
export default utilityClasses();
