import VislibVisTypeVislibVisTypeProvider from 'ui/vislib_vis_type/vislib_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import commTemplate from 'plugins/kbn_vislib_vis_types/editors/communication.html';


export default function HistogramVisType(Private) {
     const VislibVisType = Private(VislibVisTypeVislibVisTypeProvider);
     const Schemas = Private(VisSchemasProvider);

    return new VislibVisType({
      name: 'communication',
      title: 'Comm chart',
      icon: 'fa-share-alt',
      description: 'Communication chart',
      params: {
        defaults: {
			addLegend: true,
			addTooltip: true,
			legendPosition: 'right',
			times: [],
			defaultYExtents: false,
			setYExtents: false
      },
      legendPositions: [{
        value: 'left',
        text: 'left',
      }, {
        value: 'right',
        text: 'right',
      }, {
        value: 'top',
        text: 'top',
      }, {
        value: 'bottom',
        text: 'bottom',
      }],
	  editor: commTemplate,
      },


	  implementsRenderComplete: true,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Y-Axis',
          //min: 1,
         // aggFilter: '!std_dev',
          defaults: [
            { schema: 'metric', type: 'count' }
          ]
        },
        {
          group: 'buckets',
          name: 'segment',
          title: 'Source',
          min: 0,
          max: 1,
          aggFilter: '!geohash_grid'
        },
        {
          group: 'buckets',
          name: 'group',
          title: 'Target',
          min: 0,
          max: 1,
          aggFilter: '!geohash_grid'
        }
      ])
    });
  };
