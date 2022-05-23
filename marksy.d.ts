declare module "marksy" {
    import { ReactNode, createElement } from "react";

    interface MarksyCompiler {
        tree: ReactNode;
        toc: any;
    }

    interface HeadingProps {
        children: any;
        id: string;
    }

    interface NodeProps {
        children: any;
    }

    interface ImgProps {
        src: string;
        alt: string;
    }

    interface AnchorProps {
        children: any;
        href: string;
        title?: string;
        target?: "_blank" | "_self" | "_parent" | "_top";
    }

    interface CodeProps {
        children: any;
        language: string;
        code: string;
    }

    interface MarksyClientConstructor {
        createElement: typeof createElement;
        elements?: Partial<{
            h1(props: HeadingProps): React.ReactNode;
            h2(props: HeadingProps): React.ReactNode;
            h3(props: HeadingProps): React.ReactNode;
            h4(props: HeadingProps): React.ReactNode;
            a(props: AnchorProps): React.ReactNode;
            img(props: ImgProps): React.ReactNode;
            p(props: NodeProps): React.ReactNode;
            del(props: NodeProps): React.ReactNode;
            strong(props: NodeProps): React.ReactNode;
            blockquote(props: NodeProps): React.ReactNode;
            em(props: NodeProps): React.ReactNode;
            ol(props: NodeProps): React.ReactNode;
            ul(props: NodeProps): React.ReactNode;
            br(): React.ReactNode;
            hr(): React.ReactNode;
            code(props: CodeProps): React.ReactNode;
            codespan(props: NodeProps): React.ReactNode;
        }>;
        components?: Record<string, (props: Record<string, any>) => ReactNode>;
    }
    function marksy(
        settings: MarksyClientConstructor
    ): (markdown: string, options?: import("marked").MarkedOptions) => MarksyCompiler;

    export default marksy;
}
