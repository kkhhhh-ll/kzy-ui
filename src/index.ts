
import type { App } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import Collapse, { CollapseItem } from '@/components/Collapse'
import Color from '@/components/Color'
import Dropdown from '@/components/Dropdown'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import Message from '@/components/Message'
import Switch from '@/components/Switch'
import Tooltip from '@/components/Tooltip'

import '@/styles/index.scss'

library.add(fas)

const components = [
    Alert, Button, Collapse, Color, Dropdown, Icon, Input, Message, Switch, Tooltip,
    CollapseItem
]

const install = (app: App) => {
    components.forEach((compoment) => {
        app.component(compoment.name!, compoment)
    })
}

export {
    Alert, Button, Collapse, Color, Dropdown, Icon, Input, Message, Switch, Tooltip,
    CollapseItem
}

export default {
    install
}
