import CustomStore from 'devextreme/data/custom_store';

function isNotEmpty(value: string | undefined | null) {
  return value !== undefined && value !== null && value !== '';
}

export const store = new CustomStore({
  key: 'OrderNumber',
  async load(loadOptions) {
    const paramNames = [
      'skip', 'take', 'requireTotalCount', 'requireGroupCount',
      'sort', 'filter', 'totalSummary', 'group', 'groupSummary',
    ];

    const queryString = paramNames
      .filter((paramName) => isNotEmpty(loadOptions[paramName]))
      .map((paramName) => `${paramName}=${JSON.stringify(loadOptions[paramName])}`)
      .join('&');

    try {
      const response = await fetch(`https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders?${queryString}`);

      const result = await response.json();

      return {
        data: result.data,
        totalCount: result.totalCount,
        summary: result.summary,
        groupCount: result.groupCount,
      };
    } catch (err) {
      throw new Error('Data Loading Error');
    }
  },
});

export const storeInvalid = new CustomStore({
  key: 'OrderNumber',
  async load(loadOptions) {
    return Promise.reject(new Error('some error'));
  },
});
