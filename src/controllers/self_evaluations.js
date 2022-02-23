const Self_evaluations = require("../models/self_evaluations");
const status = require("http-status");
const sequelize = require("../database/sequelize");
const moment = require("moment");
const PDFPrinter = require("pdfmake");

exports.Create = (req, res, next) => {
    const { user_id, strong, improve, knowledge, skills, attitudes } = req.body;

    Self_evaluations.create({
        user_id,
        strong,
        improve,
        knowledge,
        skills,
        attitudes,
    })
        .then((result) => {
            if (result) {
                res.status(status.OK).json({
                    msg: `Auto avaliação respondida com sucesso`,
                });
            } else {
                res.status(status.BAD_REQUEST).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(status.BAD_REQUEST).json({
                msg: "Não foi possível responder sua auto avaliação",
            });
        });
};

exports.GetByUser = (req, res, next) => {
    const { user } = req.query;

    Self_evaluations.findAll({ where: { user_id: user } })
        .then((result) => {
            if (result) {
                res.status(status.OK).send(result);
            }
        })
        .catch((error) => {
            res.status(status.BAD_REQUEST).json({
                msg: "Ocorreu um erro imprevisto",
            });
        });
};

exports.GetPDF = async (req, res, next) => {
    const { user, self_evaluations, manager } = req.query;

    const [response] = await sequelize.query(
        `SELECT users.name,
        users.email,
        users.current_position,
        users.admission_date,
        users.project,
        users.activities,
        self_evaluations.strong,
        self_evaluations.improve,
        self_evaluations.knowledge,
        self_evaluations.skills,
        self_evaluations.attitudes
        FROM users
        INNER JOIN
        self_evaluations ON self_evaluations.user_id = users.id
        AND users.id = ${user}
        AND self_evaluations.id = ${self_evaluations}
        `
    );

    const enMonth = moment().format("MMMM");
    let ptbrMonth;

    switch (enMonth) {
        case "January":
            ptbrMonth = "janeiro";
            break;
        case "February":
            ptbrMonth = "fevereiro";
            break;
        case "March":
            ptbrMonth = "março";
            break;
        case "April":
            ptbrMonth = "abril";
            break;
        case "May":
            ptbrMonth = "maio";
            break;
        case "June":
            ptbrMonth = "junho";
            break;
        case "July":
            ptbrMonth = "junho";
            break;
        case "August":
            ptbrMonth = "agosto";
            break;
        case "September":
            ptbrMonth = "setembro";
            break;
        case "October":
            ptbrMonth = "outubro";
            break;
        case "November":
            ptbrMonth = "novembro";
            break;
        case "December":
            ptbrMonth = "dezembro";
            break;
        default:
            ptbrMonth = "null";
    }

    const date = response[0].admission_date.split("-").reverse().join("/");

    const fonts = {
        Helvetica: {
            normal: "Helvetica",
            bold: "Helvetica-Bold",
            italics: "Helvetica-Oblique",
            bolditalics: "Helvetica-BoldOblique",
        },
    };

    const printer = new PDFPrinter(fonts);

    const title = [
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#264653",

                            border: [false, false, false, false],
                            margin: [10, 10, 10, 10],
                            alignment: "center",

                            columns: [
                                {
                                    width: 600,
                                    text: "Minha autoavaliação",
                                    fontSize: 16,
                                    fillColor: "#dedede",
                                    color: "#fff",
                                },
                            ],
                        },
                    ],
                ],
            },
        },
    ];

    const content = [
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: `Nome: ${response[0].name}`,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 20, 30, 0],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: `Email: ${response[0].email}`,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 0, 30, 0],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: `Data de admissão: ${date}`,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 0, 30, 0],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: `Cargo atual: ${response[0].current_position}`,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 0, 30, 0],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: `Manager: ${manager}`,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 0, 30, 0],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: `Projeto: ${response[0].project}`,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 0, 30, 0],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: `Atividades: ${response[0].activities}`,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 0, 30, 20],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#dee2e6",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: "Pontos Fortes",
                                    fontSize: 16,
                                    fillColor: "#dedede",
                                    margin: [10, 10, 0, 10],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: response[0].strong,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 10, 30, 20],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#dee2e6",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: "Pontos a melhorar",
                                    fontSize: 16,
                                    fillColor: "#dedede",
                                    margin: [10, 10, 0, 10],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: response[0].improve,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 10, 30, 20],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#dee2e6",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: "Conhecimentos",
                                    fontSize: 16,
                                    fillColor: "#dedede",
                                    margin: [10, 10, 0, 10],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: response[0].knowledge,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 10, 30, 20],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#dee2e6",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: "Habilidades",
                                    fontSize: 16,
                                    fillColor: "#dedede",
                                    margin: [10, 10, 0, 10],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: response[0].skills,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 10, 30, 20],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#dee2e6",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: "Atitudes",
                                    fontSize: 16,
                                    fillColor: "#dedede",
                                    margin: [10, 10, 0, 10],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 0,
                body: [
                    [
                        {
                            fillColor: "#FFF",

                            border: [false, false, false, false],

                            columns: [
                                {
                                    width: 600,
                                    text: response[0].attitudes,
                                    fontSize: 12,
                                    fillColor: "#dedede",
                                    margin: [10, 10, 30, 20],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            columns: [
                {
                    width: "*",
                    text: "____________________________",
                    fontSize: 16,
                    fillColor: "#000000",
                    alignment: "center",
                    margin: [0, 30, 0, 10],
                },
                {
                    width: "*",
                    text: "____________________________",
                    fontSize: 16,
                    fillColor: "#000000",
                    alignment: "center",
                    margin: [0, 30, 0, 10],
                },
            ],
        },
        {
            columns: [
                {
                    width: "*",
                    text: response[0].name,
                    fontSize: 12,
                    fillColor: "#000000",
                    alignment: "center",
                },

                {
                    width: "*",
                    text: manager,
                    fontSize: 12,
                    fillColor: "#000000",
                    alignment: "center",
                },
            ],
        },
        {
            columns: [
                {
                    width: "*",
                    text: `${moment().format(
                        "DD"
                    )} de ${ptbrMonth} de ${moment().format("YYYY")}`,
                    fontSize: 12,
                    fillColor: "#000000",
                    alignment: "center",
                    margin: [0, 20, 0, 20],
                },
            ],
        },
    ];

    function Footer(currentPage, pageCount) {
        return [
            {
                table: {
                    headerRows: 0,
                    body: [
                        [
                            {
                                fillColor: "#264653",

                                border: [false, false, false, false],
                                margin: [10, 10, 10, 50],
                                textAlign: "center",

                                columns: [
                                    {
                                        width: 600,
                                        text: currentPage + " / " + pageCount,
                                        fontSize: 12,
                                        fillColor: "#dedede",
                                        color: "#fff",
                                        alignment: "center",
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        ];
    }

    const docDefinitions = {
        defaultStyle: { font: "Helvetica" },
        pageSize: "A4",
        pageMargins: [0, 50, 0, 50],
        header: [title],
        content: [content],
        footer: Footer,
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinitions);

    const chunks = [];

    pdfDoc.on("data", (chunk) => {
        chunks.push(chunk);
    });

    res.setHeader("Content-type", "application/pdf");
    res.setHeader("Content-disposition", 'inline; filename="nice.pdf"');

    pdfDoc.pipe(res);

    pdfDoc.end();
};
