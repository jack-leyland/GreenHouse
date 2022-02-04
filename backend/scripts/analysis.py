import pandas as pd

metrics = ['energy-rating', 'energy-efficiency', 
    'environment-impact', 'energy-consumption',
    'co2-emissions', 'lighting-cost', 
    'heating-cost', 'hot-water-cost',
]

current_metrics = ['current-energy-rating', 'current-energy-efficiency', 
    'environment-impact-current', 'energy-consumption-current',
    'co2-emissions-current', 'lighting-cost-current', # CO2-emissions had a column for emissions/floor area
    'heating-cost-current', 'hot-water-cost-current',
]

potential_metrics = ['potential-energy-rating', 'potential-energy-efficiency', 
    'environment-impact-potential','energy-consumption-potential',
    'co2-emissions-potential', 'lighting-cost-potential', 
    'heating-cost-potential','hot-water-cost-potential',
]


def metrics_to_numeric(dataframe, metrics):
    """
    Convert the columns with column name in metrics in the Pandas
    dataframe to numerical values.
    """
    for metric in metrics:
        dataframe[metric] = pd.to_numeric(
            dataframe[metric], errors="coerce"
        )

def generate_differences(dataframe, metrics, currents, potentials):
    """
    Generate columns based on the differences between currents and potentials
    """
    for metric, current, potential in zip(metrics, currents, potentials):
        label = "difference-" + metric
        dataframe[label] = dataframe[potential] - dataframe[current]

def generate_normalised_data(dataframe, metrics, currents, normalise):
    """
    Generate columns based on normalising the currents by the normalise column
    """
    for metric, current in zip(metrics, currents):
        label = metric + "-per-" + normalise
        dataframe[label] = dataframe[current] / dataframe[normalise]



        

