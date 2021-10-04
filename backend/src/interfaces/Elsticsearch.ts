interface Hits {
  _index: String;
  _type: String;
  _score: 1;
  _source: Object;
}

export interface ElasticResponse {
  total: {
    value: Number;
    relation: String;
  };
  max_score: Number;
  hits: Hits[];
  suggest: Object;
}
