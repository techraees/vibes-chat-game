type HeaderProps = {
    title?: string
}

const ContentHeader = ({ title }: HeaderProps) => {
    return (
        <div>
            <h3 className="mb-1">{title}</h3>
        </div>
    )
}

export default ContentHeader
