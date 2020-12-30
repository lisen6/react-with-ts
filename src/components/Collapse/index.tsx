import { format } from "prettier";
import { FC } from 'react'

import Collapse, { CollapseProps } from './Collapse'
import Panel, { PanelProps } from './Panel'

type CollapseComponent = FC<CollapseProps> & {
  Panel: FC<PanelProps>
}

const TransCollapse = Collapse as CollapseComponent
TransCollapse.Panel = Panel

export default TransCollapse
