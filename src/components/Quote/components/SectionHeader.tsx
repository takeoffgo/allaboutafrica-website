import React from "react";
import { Columns, Column } from "../../Bulma";

const SectionHeader = ({ title, subtitle }: any) => (
  <Columns>
    <Column>
      <h2 className="title is-4">{title}</h2>
      {subtitle && <h4 className="subtitle is-6">{subtitle}</h4>}
    </Column>
    <Column className="is-hidden-print" narrow>
      <a href="#top">Back to top</a>
    </Column>
  </Columns>
);

export default SectionHeader;
