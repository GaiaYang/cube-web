import React from "react";
import { ConstructionIcon, InfoIcon, LucideProps, PickaxeIcon } from "lucide-react"

interface NoticesProp {
    type: 'inProgress' | 'mention' | 'underConstruction' | 'custom'
    content?: string,
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export const Notices = ({ type, content, icon }: NoticesProp) => {
    switch (type) {
        case "inProgress":
            return (<section role="alert" className="not-prose alert alert-info alert-soft">
                <PickaxeIcon />
                <p>
                    本頁面內容仍在完善中，資訊可能不完整，會持續更新，敬請留意後續版本。
                </p>
            </section>)
        case "mention":
            return (<section role="alert" className="not-prose alert alert-soft">
                <InfoIcon />
                <p>
                    本內容僅為附帶說明，作者未使用或未深入探討，僅在教學過程中作參考提及。
                </p>
            </section>)

        case "underConstruction":
            return (
                <section role="alert" className="not-prose alert alert-warning alert-soft">
                    <ConstructionIcon />
                    <p>本頁面正在施工中，內容未完成，敬請期待後續更新。</p>
                </section>
            );
        case 'custom':
            return (
                <section role="alert" className="not-prose alert alert-warning alert-soft">
                    {icon ? React.createElement(icon) : null}
                    <p>{content || "本頁面正在施工中，內容未完成，敬請期待後續更新。"}</p>
                </section>
            );

        default:
            <section role="alert" className="not-prose alert alert-warning alert-soft">
                <ConstructionIcon />
                <p>本頁面正在施工中，內容未完成，敬請期待後續更新</p>
            </section>;
    }

}