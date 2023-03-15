import { Button, ToggleButtonGroup } from '@mui/material'
import { useContext, useState } from 'react'
import { useQuery } from 'react-query'

import { UsersControllerService } from '../../api'
import { AuthContext } from '../../context/AuthContext'
import {
  Avatar,
  Container,
  ContentBox,
  Header,
  Main,
  Name,
  NameContainer,
  Sidebar,
  Status,
  Title,
  ToggleButton,
  UserContainer,
  UsersBox,
} from './MainLayout.styles'

interface PropsType {
  children: React.ReactNode
}

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  const [switcherState, setSwitcherState] = useState('All')
  const list = useQuery(['list', switcherState], () =>
    UsersControllerService.usersControllerGetUsersList({
      direct: switcherState === 'Direct',
    }),
  )
  const { logout } = useContext(AuthContext)
  const handleToggleChange = (
    _: React.MouseEvent<HTMLElement>,
    value: string,
  ): void => {
    setSwitcherState(value)
  }

  return (
    <Main>
      <Header>
        <Title>WBChat</Title>
        <Button variant='text' onClick={logout}>
          Logout
        </Button>
      </Header>
      <ContentBox>
        <Sidebar>
          <ToggleButtonGroup
            size='small'
            value={switcherState}
            exclusive
            onChange={handleToggleChange}
          >
            <ToggleButton value='All'>All</ToggleButton>
            <ToggleButton value='Direct'>Direct</ToggleButton>
          </ToggleButtonGroup>
          <UsersBox>
            {list.data?.list.map(v => (
              <UserContainer>
                <Avatar src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAADwCAMAAABCI8pNAAABd1BMVEX///8zAAD54Mr/MzP/LS3/eHgnOXzlzbozAQEvAAAxAAD64cssAAA1AAA0AgIpAAAlAAAnAAAfAAAiAAD/7NX/5s3/6s8dAAAlN3scMnoZMHn/7tf6+Pj/7dEZAAAUAAAAI3Q7AADz8PD048vp5OTLwMBucZXBt7crPX7s1cH/8vL/KCh8Xl6nmJjf19e0mYrk1MXSxL2Uj6L/9t8AHXP/x8f/5OT/TEz/1tb8mYz/bW39gHa4qamFaWnXzs6OfHxOMDBePj5AGBiQeHixoaGoin1ZOzbNsKDdxbJxVU6Oc2iKhZ63rrNJUYc6SINiZo+ooa1UW4pAERFkS0tRISFsR0FRDg7/VVX/iIj/Pj761cH/X1//pqb8pZb6yrf7t6b8kYVMGBheMS2FYVdEJyNdQjhKLz8wCRcuM2oxLFcxHj4xIEE0FSdANlyMi6MBAAA0FxVsExOGGRqlcmiZHx+0JSXMLCywIyNLNTXFUlLjMTH/urr/oaE88r1TAAAYg0lEQVR4nN1d+WPayJIOghhJrZa4hDl8YGMDig8OZ+IkdnzFmMPGN0kcj3NBdpKZbF5m9r15u5P547db4hQCWi2E/fL9kBkDavWnrqqu6qpu3btnE6bm5xdWF5ObK9vPny2rePZ8e2UzubUwPz8/Zddd7cLUwtbi/vby7jnkJI9HkoQGJPwXN/d+d3l7H1O77X6SYh6xudiZEySB4x0IYhfwJzyHyM1dXjxbSa7e/eGaTz7brUNBYB0OVoWjB43PIcsJ/N7OxfbiHWY1tbBZ5X0S54Cwl4gRRAfkBc/k3HJy4U7SWk0+v/QLbEO2SIF/j2hdPk8u3DYBPbZWLqDAO8zxaQ6W6OAleMckMLlc5zmHkeKQDhZ0cNzexeYdIbWw8n5SYAnVZwAgK/jntu+AVq2uXHo5KnnrBVIr//nK6u0SWljZRRZuNIRUUiwv7GzfJqnkroN30GuQEVg0Ee/s35b0bVUnuZHSaQDy/svkbZBaWNmT4OhErhOsyAnPxy99W8sCbw8hDNEh7Y7bom/uCCNWom4glTp/Pk5C88/8vI18GvC/3xobo9ULv/2EkEYJ9XEJ3+KuAO0UuhZEbm9lLIySe2MQOg0sz41DofZnx8YIw7Nsd9QxtYlkfJyUoGAzp6nNPRtnI2MIy7YuuyTP+bEYhg6wUHpmI6NF39gZIUDpuW22fGuPG7fUNUit2MRp4cIWx5sA/N6mLYymnnPWo3E6iNy5LWZvxXdLhDAn4YMNZm9LstX1HgZue+TqNL8r3I5paOJ85Oq0LdyWIjXAXY44zk2e36bUYSB1GqnozS/f9iAhTv6RRhr7wm0Twkmc88XRMZqf425b7jC4i9HNTs89t2vtGoDSyCz56t5teKu9YNm5UYne9m35dnqIwu5ohml1d6yh+SBA/2gm3BXptpm0IPKXo/D1FnbvhLnTANlRTE6bd2BOamMkhrx6y/6qDnNJy4xWx7FYbALSM8vatH03ptkmWP7cqkc+tXtLSyh94d23SGlx7+6YOxUit2uR0gp/61FFN0SHZM3moUCJ9F7jGk3RogextUPqDEGbctE9EC0uKCdJC9Eck74xLfMhZbLiu05tE/l3LBSkfKFuGMw3qiVHSJevWzHj8xck/h3rkA4K0UDhwNNRe6PyYFme5zhO4DieZ0UomqzW64NzKw7EwnuCijTR4SsVAwwju0uTAlIpEeJ/eMHr9/m8Apw7R4Cs4PH5/F61BtEiLQituK5bBMEfFP5RjgMGAcTT57OTHq/HNzM765/7UMunC0W3260obnexWEjnax/mfLOzPoG4VNT4hty2BUorQx08JHQ7hTWmgahcKFerpVo5XVDktbVoNCCDBuRANLq2BpRCvnZQlyTaEktMSbCSb3omDbmtyHpVoWsCBKKy2nvEhTEA/i7AFNPl0p7kEdDlFJRYS6nOYQ6eyE2WFX3fDbl0/QDxVYrp2p7Pw9NUUFiJmabmBieboSSlA0MZGNMCIK6kq55ZimVcK5QWPINaZqH0sRilItRAIKrkDyRkBc0NFX9BPzFtTQ5oWOT9NSUwvN+DByuqpEuiZK6WlN+lp7Tp738rkePyw9WGgJSsFKoeyYz4WaG00j+ihRKblq0TUkmh+exy1kRZNr9LX9W27e1DiYWeA2tq1I1oIF+XiCt5+B16Sv2mJdbhKbmtqlEXQLRYFklr4tg6PaXlPutd0FNTRiR1LchMuu4ni7nYPfrV/j4pZzhbG4Vh6CGllAgL4+hzZ/M7Rs4Dy3rya8M7SAEQTdeJhA9SRxcLdYO8Esty+ZGqUScCxZJ/uJWAHPW61+KeUXtS2Qaha3FSyt6hFX9QoC6T2jQIr6G/ZIcetQHS0jC3j6VPcK70LpCI0gHQwj01BsKIt4H/BICYcaMBubuBaPHjEE4sRxtdTD3TreGxSI9gMYr7zSiZTDabPDrN5Q4PExoOD3Onp0fZbEYBsnG01MEGNcI0WuhsIHd6tJnd/K9fOIih3bSXEr9D6Yqv9tTfQSiUM7gbXw8TZ5XjVCgc0SEcSlXOErmjLBMcMHHJQZA5yh2eVJothMPhjhaOjz99+vT5869ffhGbxHSc5iidPP1yOIRffvt8doaZIIQwJnqBPkVfHp/lstPBPoSmM6eJSkhtw7iBxsepVOrT59++GGi0h9KK73er0pdP+H64G6n2vcMa1Oes0dQ6MxGOxc6O4gYjBUA2EYtFQqlUdxuRRlO4iVAHP9zarzpGokS3oDK13e3hfUl1PcxwJHVcOTs5aagB/ucECeOEKjvqLyKRRLZHpeTM11Sk2UIkPNFqo6FRJ2eokXCke/h+042TKFSpKM0vC12C98unLkInp4vZTCajKM3OKg2LkUtUwngUMKnKkW6c5OyZ1l00KsdI55LImqA2lI42UCtHiVCkk9IXPSX+PZUV12fSuQ5KkWMkVM3lrKZANe16PJ49PYvFVLkJn053MVo8DqvXx45zWSUu69poNgLi2bNYB6WeuZcVqKz4wvtudwh+bjNKxPuoftMATGcOU7jzoYeZjnECmTOVUSixGJwe6MrL07m27H3qnR4nqcKL1bnulBH8tYPR0NBCDibV7se+dpAHRyrN0NHgJ6Ii3ub0uceVFX1UOaYt/f7SpjKFKxkSB0HOVlCnwmeM3EL8MKIyChJcD5hEuKlK+kFyiH4qx3WxZ6LVJC8U0et8HwSPsD6kjjQbolqPY0QykiO7XM427PinXjeWklKyJ6X5i6oe4RNleH9UTFfC+Al0ADEKkY0xvjwRUeeNXzulRYsRRQ9V8iLZypY1WuTZfdzHcI7UL50+jbWmy9Z/w19NXI4opf6746GynLbFzSqlpk6xfvcimtjDp6TLDiCTUif/Cc2D0ryOVJL08mAWPZHI13yHtLD+wgF2ACxSEi7K3zSf2FeII5UNEVNi4gk8Y6Ip6rhSSSEXSZM70svlbGQilMoU6y25E/3VtYLAU1Na1J4OFNKBquYaTRaip2E0SsQBkXyKKeWyaJ5CPmz2FA1aJEH8QORsLBU5nHZ/bNkp7rwImJpEb/FUgWP5g2I0PYOHSZxJR5MpU5SSYTwsms2W5bVKOBXLDZ+SGgguxlKxo2ml1FqnwmsEchp505S1D1sQU4LeGmDiH1QBnsmvobmG3Dwg/ycVCp1lWn3ElE7JKaFJIJYNglpzwZyvo0GSizs8mmqpoovVORxQQn8+wAQKPhZ7IbW1zFkofEjaJwagiQhRaj6C6UoEPXZiSthghjNyoNygBD14IQcwJQmKk1QreQuXvEqpEEB6XsYC7KlG0ZQeTsRNUTppUzpBlJLklA5joRTDRMselZIo1NUl3gD+208VqWueOPRiSqB4IEDUJpAPwx2SNJwSUr1EK/OJ504ToxQ8iYQrcWYtr1GCSJXxx4G8H7I8lSeulXFASc0uywWOFdlz93QORUK9gV0/SotoYmnL6fTXmAldAkwlFEkEm5REb1WTDkyJn6OKl+afCa1Rwg39g4VSYQ2Z5QjxZCkfhTpduuBRxITFwz5e5GuLEs8VtIYCZR/kL2kYNeqHNF1CiOY53pOP4vskiHuVi6TCbSdXziCPL0G6zhdsPL21NKYEpXzjOhnpEkcXqN/bxyuEqsVTEU/XJ0sAVMLhY0JGTPwkMnGcbY+pchYm9lpxcBE6Rj9WRwkK1YZKqhZPojxgIAlVy1lrdkkuHNSLyAxNkFot7OOheKlNAcVLqQlCsZWRtVSNqyZ4TbFjgPuAY+n8IeQ+nGPHTvjYsliyUktPL8aQ5E337UknsCvdpTsyimpJPXEZ+V4R7KhgSnC23EyjyoVvDoeHsnBya0f1F78V2o81qprWVHiR5EkD+TgciujWHkKhYyKDCTKVsDZL43nJU23lf0BecrCQcrVV28DdnXxBDkkyhAWCoFvIoUnpBlTOhVMRIpsXRJZFM5bRspfbKbbWkJQDgeUvKdfE59VlfparF7v7jwKMFEGsrg7JRLbrh3KmEkLz2vCL5WwopBoHbLS9e+16BDktsCx9xU1jL62nO+uH9JZoRSWYQ8pwqHOegqcPU5GzoaoIsHg/VB0NZOFmy+0OoEAH6Tf1JoUVNWsgcry7q/9BpOSRyjDRw9NK+KSHuernDZubAECmMaItlwHlY61dYRFNz4pIF6izgMlzzbny1bqrNoI5bPUGRqcAGTckOb1mBIkjovqVGXgxg1Wu4RsCpdyeBgBzKeBDN6krxbfqWr6KFQpdogfA1wjm1F/N5fgpYhQzmoLkbAXF34cDLg4yh2HcfHNq7Sj4C2jOEX2RwMJOIxPcMTc1SOUi4XDlqM8isDydRSYkHDF2upEuokGuJPukn9DFJ5HQw0RrHDuEFM1J+BlbKbi5aITI0K/Pok8vIsfo4Vk2rk9h4jX6TCKGRvEs2y9lxpzgITxJ4kyB7mI5nkUXh49PjSwIchzUJR4rJYatGiJWSOtqHYKZXCUSC52cZjMdK8Q4/3qamIiEIqlcf12TwWkF/SR8drrYdTFQ0zCxSOrQ+GmAmhY50Ru8juI1kRMLusIuWc7mjmOxyPHJYe70KImBU8knxzjrijoFBhgAIGdyKZxbS50lui6uhGOx1OGisfGI5rVzQSwVVW/6mmszKKIt6mtSgKwcnYQePsRpSpxXTeG8XiQWix1/zQwz8YgUGqmHMS3fjK8NoUsfPoxUcv2ujaYb54JA3kLpe8c+QMSp0FtnE5wGSNBOziromaPuTVQqJ4enWXmaJDMxPZ05+ppAl4bxpSF0aSKXzEz3yzsBFMxqXYFWDuiYh+2qA1GqFwyqGUAwGASZDJIbhGQmA+RB1QHdkNGlinbp0VEmg//udy1g8kIzg2eldu3evcuOeh5R2MszhgVRWpFJUFNxUj7dlwZlvfXr+lXAXWuVFrHWdsZ0l77zUrUQWKMsDKcGCKwx+Z32+Toit2Nl/9Lz7joBKM2+Lxd6yvftZeQu1LiZjhIMUVi2wAhZ8e7cpigKPl9+rJSU0oyf60zWWtw4l+zZZCaKUok0CzgKgOK57tRoykRME6uwdyMmt1cc4zAF0vpNEpTZ9CaMdpm1l8HGQqnaU37vt3ScK/LFeyiJHWsbtgMoDl3JMArTLW0VXjDY3ihycHw2L5qe0Q2SyNKthzehL43SJG9G78LaSKnm7ymJolsPb2JqW+qlJPpK46IkKz3nBVnddo8o9ZYsstzeuCQvkO65v8WZ9t7UitGueyjpA0KbAEC5lxLtEn8T+0Ybz6G3POpNJH0ouQ96NmGIXiu7ahGSDqOSbX5nPLOtWhCgp2TNeWgkZHoh5McyTPFSryqzHosHjSTnjBjhDM0YGIGCw2DzD20ipgk1x2TAaSwGIloy2l4pWTx9rQ8lUZiz344HCrOGQm+VUp8DbuBk2e7pFjAHhlsROZsosfp18tEjkPca2ia7KDmgULJX9OSC0R43BN4uSihsqdnJCLjrhse2sA7WMqV+jHqyg6NlFC/123ltWfCMLR6GyHtts+SAKU/222lm2eLN9R8lnM+wx+yBeKNgzQiSxQPy+jhETfjz5Dv/TDBSSn3HyOHwWqS0OfiUMtZTHvnObkYuVvWhbNctLfp4hsFF5w38pZ4kjTWAQGGnv9RZ98RRCDiEEsQHRY2UUX5v4OFHVuMl/eY5A0BhZnSb8EHA/WFm8CZ1q1GtVjk5GKJj8qAwsI6BGAElfe4Zsu/e6tqD0Tpe7ziJ0l65GLU8UnKgUBKGnuFjdYXIaLXViBQv1fOyNZUCUaX8TRh+KprVdTyt/J2I1OxlOk4/SQFZKXMDJqMOSiy0dHDrIvlJk1DyVwuK2cSmBhm403uEpyCyDsHSmvj+wOOidI/PIcFSWjGvU4FoEZ8ZRXxWpbXMxfOhNryLFCsIB3nGHKlA1F2uSwL5eVEWTwQ1fbQuFGZh2W3iyId4oTo5Y+psWNFraWJ6b/o1X6LI+Rx5huBIObWEq1jye0y+vtfaxLRAc967CH1Vxa0ozMDzOfB36FeFb6bfR2xtYkr6zA4SBvSUFLd6xGQ/VvhjfAAlpmS+feozOTDoDt5uUtJYMfqaO/xP63saSg4rBTf9DsAiptSkpQ2XdmSA0vGlUqiTTeVd7UP6iGme7ixxHSWVVWMJXdF/Uaibf+EE5OnDiy2KR+hQjyrS9bzBy+AzKkrCM+oE9D7dibGIEjCgZASlSEHJSm3rNt3Z04hSoEfEDIdNYago0VcgmzgeXUepFlAN2wBaqnYBRlbqNO+joX4xxBblu2LEZvU/aJiEbvunmYpGXTsdJYF2RcU4Azgc0FfrPELY4MyY9pfKDgUl+m0khgUCBBAna6QBLiUlbpfOPpAspRhTmiFOpwHlgGLqY1nK91MufKB8N5Y4kyemxBxQOSiU+dqeE26IKc0Sr/4DUDUVZDZAu2NTX9dqghJ5zjNQGrRY3PcOlCETnc9qklK0RhO/iNwHKkqX1C+uniwSr71Gy/oSQiJK7ByNFR98lvgAQF4iT0xH87NUD85HU9Cf9NGqEgfJl/0DBSpKdAeNUL9KSpQuydf8A8VBp7D3vweVyVumsa4YEJ9HQgpZ8dK8DYkqIzNF/RZh0W+mFgfM0dyHyooT5iyM4DdTOxCt0k1MF+YpUQbp2KeEZkoqA3maF39TvbBoUFnKYHjMFeIoexSSJ3I75iemzf5lKQMBBZN1r3KaMz+nj40SK4oO717BXNoWMHlJMPvWMDpK5p+c6OD8/gOTjDCn9PmkhxPNvJKESpdMUoKQlWZm50ppiiI9ILvzVWEWv46KmBKNxSMXPFZ08Jwk1KvlgrxGV6kComtMofyxLkkcC0lGS5Qo5iVCi4elTfKIH8vpIhO1spcTBAIMftsU75F4OPRlU6KHYg15lWDNUBQh5/fBar7gZkzvqDViJTPuQvmA93l4cbC9oNo8N78zpIhD0x5YTbvjJs6uH8YKN1XMf5CGaZaHZj1lQFCL5IJtaA9Ys16V0sMrGlUKtYNvkoR8MkPNooxq+73VR9Ue7/mBZe0ZyCoQwO9x28GaZSCDLF2115aB74VPyhf8/rnSiLRnMCuZKSLN4nweDna//ZGlrW+97Fo0RGRYQfKhuac2Uu0ZyAofPFLMV5FmSfj9j7DxWgXq1dZ9b5MM1hxJOH/x4vc//qco26A9A3mpc9aHFwjnIiegjnAs7TL/gmrzkJ1G886LP/75rz//unI6N8YyPD2swFPnX3/99eef//r3P//4/QX/v5T5pakVDo2QNAl//6fKRsXSxhh3PrfxzuVs4gpR+7/vj+g4re4Kk7Mv/t2io3G6Gdue2haiN04drl6++omKU/L9H918MFxviY9tHRECb5f0nXC6lpauXj0y7Y0/+vnPnqZQYy/fjJdT/PWVy6AfSGCuXj02RerBz9eGDTldT1+P00SA19fGjHBX1l+ZUKqfrp39WlraGKc6gY2+jFSZ+U4qc/eXBjQ0RrMHwNNeReritHT9mGiI1ge3s/RkTOoEwMbgnmBSV9+HatSDv/voYwduxsIJgHdDe4Lx94PBjKbukzQzlukpTsbI6bo/cJweDRG6BsYw5ZJIXbM36wPG6fFLsgfjdN3Y7O7FGWJGiNPTvtacmBHCE1spxV8TKUDrCd/vM06PTDByujZsDDMCA2ZY4968MtSnB8NNXSeWru3yI0D8rYtc6hq9+duI0ZBpzYCTPf4eYG76+i4DetPrnD94ZboZ1/qNDSsqgdcbFIycruseE/HdfCtOl2sjPuqBWnuzTkEId0Yveo+pmkFTwluSk7iJEWfeDfIvB+KqW/SmzBi7TriunjAjGyhkF8wqdGdXui35z9QtuVxPRzVQgddPzBldfVc6Q43H61ZaunrHjMA/AtG3tKLS7MjLDrEzb+26sOS8ARZHCsTfXFNrUasfbW36qWfZxCRQKPaWsUAqDt5sOOm1qNWN+xampN7WnE/fmtw01yYUf7Ox7rLeB6dzvRnjUhpwHVzO65v4mnlS0eibDUtWoRM/Nyjdtz7kKlxLV+/emMoBoB+/vnm5NKL74/UrzY4/GFmLmNT9mzdIkojezxEHr9++Wx8dIWdL8ujnJAO4llzrGzdvwJB8GohHA4jPtdOyldPdXp2apkyGJsObdbmurt8hY7EWNRotxGZtDby52Vh3jsQkdGFJjZssW3DDppfQaN1/8vbNa6Qv8Xjz3bpYIl+/vcGjszTi8dHgusbK9LcdTavN416vv3y68e7dkxuEJ0/ebWxcr1+5bKKj4uoRjvxsa96pCqHKwNXxPzbeDt3wsUX37u5hCdmH7/Y+tXFj6W/ksY7ShN8+XK9sVqXxA3muD34sVUIu0b3HP9YgOZ0v733/sVQJU/r7x6M0gujvbuHlPVMJgv8AuF7eG7UbfttAFu9lw//6UbD09N6r+z8Yfv5/4X0Lv6CL2wMAAAAASUVORK5CYII=' />
                <NameContainer>
                  <Name>
                    {`${v.first_name} `}
                    {`${v.last_name} `}
                  </Name>
                  <Status>{`${v.status} `}</Status>
                </NameContainer>
              </UserContainer>
            ))}
          </UsersBox>
        </Sidebar>
        <Container>{children}</Container>
      </ContentBox>
    </Main>
  )
}